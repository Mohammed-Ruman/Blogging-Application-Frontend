import React, { useEffect, useState, useRef } from "react";
import { getcategories } from "../service/Category-service";
import JoditEditor from "jodit-react";
import { getUserdetails } from "../Auth";
import { doPost, uploadImage } from "../service/Post-service";
import { toast } from "react-toastify";



export default function Addpost() {
  const [categories, setCategories] = useState();
  const [user, setUser] = useState();
  const [coverImage,setCoverImage] = useState(null);
  

  useEffect(() => {
    getcategories().then((data) => {
      setCategories(data);
    });

    setUser(getUserdetails());
  }, []);

  const editor = useRef(null);
  // const [content1, setContent] = useState('');

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: 0,
  });

  const changeHandler = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const changeHandlercontent = (event) => {
    setPost({
      ...post,
      content: event,
    });
  };

  const imageHandler=(event)=>{
    console.log(coverImage);
    console.log(event.target.files[0]);
   if(event.target.files[0].type.substring(0,5)!=="image"){
    toast.error("select image only");
    return 
  }
  setCoverImage(event.target.files[0]);
}

  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim().length === 0) {
      toast.error("Title is empty !!");
      return;
    }

    if (post.content.trim().length === 0) {
      toast.error("Content is empty !!");
      return;
    }
    if (post.categoryId === 0) {
      toast.error("Select Category");
      return;
    }
    if(coverImage===null){
      toast.error("Select Cover image for the post");
      return;
    }

    post["userId"] = user.id;
    console.log(post);

    doPost(post)
      .then((data) => {
        console.log(data);
        uploadImage(coverImage,data.postId).then(data=>{
          toast.success("Image uploaded!!");
        }).catch((error)=>{
          toast.error("Failed to upload the image");
          console.log(error);
        })

        toast.success("Success: Post created!! ");
        setPost({
          title: "",
          content: "",
          categoryId: 0,
        });
        setCoverImage(null);
       
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error: something went wrong");
      });
  };

  const resetHandler = () => {
    setPost({
      title: "",
      content: "",
      categoryId: 0,
    });
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={createPost}>
              <div className="form-group">
                <label
                  htmlFor="title"
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control my-2"
                  id="title"
                  placeholder="Type title here"
                  value={post.title}
                  name="title"
                  onChange={changeHandler}
                />
              </div>

              <div
                className="form-group my-3"
                style={{ height: "280px", overflow: "auto" }}
              >
                <label style={{ fontWeight: "bold", fontSize: "18px" }} >Content</label>
                {/* <label for="exampleFormControlTextarea1 ">Example textarea</label>
                <textarea className="form-control my-2" id="exampleFormControlTextarea1" rows="8"></textarea> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={changeHandlercontent}
                />
              </div>
              <div class="my-3">
                <label htmlFor="formFileSm" class="form-label" style={{ fontWeight: "bold", fontSize: "18px" }}>Select cover image</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/jpeg, image/jpg" onChange={imageHandler} />
              </div>

              <div className="form-group my-3">
                <label
                  htmlFor="category"
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Category
                </label>
                <select
                  className="form-select my-2"
                  id="category"
                  defaultValue={0}
                  value={post.categoryId}
                  name="categoryId"
                  onChange={changeHandler}
                >
                  <option disabled value={0}>
                    --Select Category--
                  </option>
                  {categories?.map((category) => {
                    return (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryTitle}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary ">
                  Create Post
                </button>
                <button
                  type="button"
                  onClick={resetHandler}
                  className="btn btn-danger  mx-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </>
  );
}
