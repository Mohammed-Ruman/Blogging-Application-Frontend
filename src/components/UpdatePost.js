import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserdetails } from "../Auth";
import { getcategories } from "../service/Category-service";
import {
  doUpdatepost,
  getPostbyId,
  uploadImage,
} from "../service/Post-service";
import JoditEditor from "jodit-react";

export default function UpdatePost() {
  const postId = useParams();

  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userDetail = getUserdetails();
  const [categories, setCategories] = useState();
  const editor = useRef(null);
  const [coverImage, setCoverImage] = useState(null);

  console.log(userDetail);

  console.log(postId);
  useEffect(() => {
    getPostbyId(postId.postId)
      .then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
      });
    //loading categories
    getcategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (post && userDetail) {
      if (post?.user.id !== userDetail?.id) {
        toast.error("This is not your post");
        navigate("/");
      }
    }
  }, [post]);

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

  const imageHandler = (event) => {
    console.log(coverImage);
    console.log(event.target.files[0]);
    if (event.target.files[0].type.substring(0, 5) !== "image") {
      toast.error("select image only");
      return;
    }
    setCoverImage(event.target.files[0]);
  };

  const updatePost = (event) => {
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
    // if (coverImage === null) {
    //   toast.error("Select Cover image for the post");
    //   return;
    // }

    console.log(post);

    doUpdatepost(
      { ...post, category: { categoryId: post.categoryId } },
      postId.postId
    )
      .then((data) => {
        console.log(data);
        if(coverImage!==null){
        uploadImage(coverImage, data.postId)
          .then((data) => {
            toast.success("Image updated!!");
          })
          .catch((error) => {
            toast.error("Failed to update the image");
            console.log(error);
          });
        }

        toast.success("Success: Post updated!! ");

        setTimeout(() => {
          navigate("/user/dashboard");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error: something went wrong");
      });
  };

  const updateHtml = () => {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={updatePost}>
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
                <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Content
                </label>
                {/* <label for="exampleFormControlTextarea1 ">Example textarea</label>
                <textarea className="form-control my-2" id="exampleFormControlTextarea1" rows="8"></textarea> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={changeHandlercontent}
                />
              </div>
              <div class="my-3">
                <label
                  htmlFor="formFileSm"
                  class="form-label"
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Select cover image
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={imageHandler}
                />
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
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <>{post && updateHtml()}</>;
}
