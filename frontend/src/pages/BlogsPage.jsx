import axios from "axios";
import { apiURL, SIZE } from "../../constants";
import { useEffect,useState } from "react";
import "../styles/PageStyle.css"
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import "../styles/BlogsPage.css"
import Paginator from "../components/Paginator";

const BlogsPage =  () => {
    const [page,setPage] = useState(1)
    const [blogs,setBlogs] = useState([1,2,3])
    const [totalPages,setTotalPages] = useState(0)
    const [loading,setLoading] = useState(true)

    useEffect( () => {

        const getBlogs = async () =>{
            let params = new URLSearchParams()
            params.append('page',page)
            params.append('size',SIZE)
            let response = await axios.get(`${apiURL}/api/blogs/`,{params:params})
            let fetchedBlogs = await response.data
            setTotalPages(fetchedBlogs.total_pages)
            setBlogs(fetchedBlogs.blogs)
        }

        getBlogs().then(setLoading(false))

    },[page])

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
            <div className="projectsShortcutContainerList blogListContainer">
                {loading  ? <Loader message="Loading"/> : (blogs.map((blog) => <BlogCard key={blog.id}/>))}
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )

}

export default BlogsPage