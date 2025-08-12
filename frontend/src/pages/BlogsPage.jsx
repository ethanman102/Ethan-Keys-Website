import axios from "axios";
import { apiURL, SIZE } from "../../constants";
import { useEffect,useState } from "react";
import "../styles/PageStyle.css"
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import "../styles/BlogsPage.css"
import Paginator from "../components/Paginator";
import "../styles/CustomScrollbar.css"

const BlogsPage =  () => {
    const [page,setPage] = useState(0)
    const [blogs,setBlogs] = useState([])
    const [totalPages,setTotalPages] = useState(1)
    const [loading,setLoading] = useState(true)

    useEffect( () => {

        const getBlogs = async () =>{
            let params = new URLSearchParams()
            params.append('page',page + 1)
            params.append('size',SIZE)
            let response = await axios.get(`${apiURL}/api/blogs/`,{params:params})
            let fetchedBlogs = await response.data
            setTotalPages(fetchedBlogs.total_pages)
            setBlogs(fetchedBlogs.blogs)
            console.log(fetchedBlogs.blogs)
        }

        getBlogs().then(setLoading(false))

    },[page])

    const handlePaginate = (jump) => {
        setPage(page + jump)
    }

    return(
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blogs</h6>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>S</u>ee</p>
                <p className="dropdownTab">S<u>o</u>me</p>
                <p className="dropdownTab"><u>O</u>f</p>
                <p className="dropdownTab"><u>M</u>y</p>
                <p className="dropdownTab"><u>L</u>atest</p>
                <p className="dropdownTab"><u>B</u>logs</p>
            </div>
            <div className="projectsShortcutContainerList blogListContainer basicScrollbar">
                {loading  ? <Loader message="Loading"/> : (blogs.map((blog) => <BlogCard key={blog.id} id={blog.id} author={blog.author} created_on={blog.created_on} content={blog.content} title={blog.title} image={blog.images.length > 0 ? blog.images[0].url : undefined} subtitle={blog.subtitle} views={blog.views}/>))}
            </div>
            <div id="paginatorContainer">
                <Paginator smallest={0} largest={totalPages} current={page} itemType="Pages" selectionCallback={handlePaginate}/>
            </div>
        </div>
    )

}

export default BlogsPage