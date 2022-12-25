import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import AuthContext from '../../../context/AuthContext';


export default function QuestionDiscriprion() {
  const { loggedIn } = useContext(AuthContext);
  var i=1;
  const params = useParams();  
 const [question, setQuestion] = useState([])
  const [comments,setComments]=useState([])
  useEffect(()=> {
    axios.get(`/ques/${params.id}`)
    .then(res => {
        // console.log(res.data)
        setQuestion(res.data)
        setComments(res.data.comments)
    })
    .catch(err =>{
        console.log(err)
    })
}, [params.id])
    
const [ addcomment, setAddcomments] = useState({
  id:params.id,
  comment:""
})

const handleChange = e => {
  const { name, value } = e.target
  setAddcomments({
      ...addcomment,
      [name]: value
  })
}

const submitcomment = () => {
  const { id, comment } = addcomment
if(!loggedIn){
 alert("Login to Comment");
}
else if( comment ){
      axios.post("/ques/addcomment",addcomment)
      .then( res => {
          alert(res.data.message)
      })
  } else {
      alert("invlid input")
  }
  window. location. reload(false); 
}

  return (
<div className="card text-center my-4" style={{color:"black"}}>
  <div className="card-header ">
  <h4 className="card-title "><b>Question: </b> {question.title} </h4>
  <p className='' style={{textAlign:"end"}}>{question.tags}</p>
  </div>
  <div className="card-body">
<div className="card">
  <ul className="list-group list-group-flush">
    <li style={{whiteSpace:"pre",textAlign:"initial"}} className="list-group-item"><b>Discription: </b>{question.body}</li>
  </ul>
</div>
<div className="card my-4">
  <ul className="list-group list-group-flush ">
    <li  style={{whiteSpace:"pre",textAlign:"initial"}} className="list-group-item"><b>Approach & Code : </b>{question.solution}</li>
  </ul>
</div>
  </div>
  <div className="card-footer text-muted ">
  <h4><b>Comments</b></h4>

  {comments.map((currentcomment, index)=>(
      <div className="card my-1" key={index}>
      <div className="list-group list-group-flush">
    <h6  className='my-2 mx-2' style={{textAlign:"initial"}}>{i++}. {currentcomment}</h6>
    </div>
</div>
  ))}
  <div className='row mx-1'>
    <input  className="form-control col" type="text" name="comment"  value={addcomment.comment}
              placeholder="Add Comment"
             onChange={ handleChange }/>
  <button type="button" className="col-lg-2 btn btn-outline-primary mx-2" style={{color:"skyblue" ,textAlign:"right"}} onClick={submitcomment}> <i className="fa fa-reply" aria-hidden="true"></i> Comment </button>
  </div>
  </div>
</div>
    
  )
}
