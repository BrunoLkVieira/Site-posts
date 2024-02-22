
import './App.css';
import {auth, storage,db} from './firebase.js';
import firebase from 'firebase/compat/app';
import {useEffect, useState} from 'react';

function Header(props){


    const[progress,setProgress] = useState(0);
    const [file,setfile] = useState(null);


    useEffect(()=>{

    },[])

    function AbrirModalCriarConta(e){

      e.preventDefault();
     
      var modalcriarconta = document.getElementById("modalcriarconta")
      modalcriarconta.style.display="block";
    }



    function FecharModalCriarConta(e){ 

      e.preventDefault();
      var modalcriarconta = document.getElementById("modalcriarconta")
      modalcriarconta.style.display="none";

    }



    function CriarConta(e){
      e.preventDefault();

      let email = document.getElementById("EmailCriar").value;
      let senha = document.getElementById("SenhaCriar").value;
      let username = document.getElementById("UsernameCriar").value;

      auth.createUserWithEmailAndPassword(email,senha)
      .then((authUser)=>{
          authUser.user.updateProfile({
            displayName:username
          }) 
          
          let modalcriarconta = document.getElementById("modalcriarconta").style.display="none";
          alert("Conta criada com Sucesso!");

      }).catch((error)=>{
        alert(error.message);
      })

    }
    


    function LoginConta(e){

      e.preventDefault();
      let email = document.getElementById("EmailLogin").value;
      let senha = document.getElementById("SenhaLogin").value;
      auth.signInWithEmailAndPassword(email, senha)
      .then((auth)=>{
        window.location.href="/"
        props.setUser(auth.user.displayName);
        
        
      }).catch((error)=>{
        alert(error.message);
      })

    }

    function Logout(e){
      e.preventDefault();
      auth.signOut().then(function(val){
        props.setUser(null);
        window.location.href="/"
      })
      
    }



    function AbrirModalUpload(e){
      
      var modalupload = document.getElementById("modalupload")
      modalupload.style.display="block";
    }

    function FecharModalUpload(e){

  
      var modalcriarconta = document.getElementById("modalupload");
      modalcriarconta.style.display="none";

    }

    function UploadPost(e){
      e.preventDefault(e);
    
      let tituloPost = document.getElementById("titulo-upload").value;
      
      const uploadTask = storage.ref(`images/${file.name}`).put(file);


    
      uploadTask.on("state_changed", function(snapshot){
        const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(progress);


      },function(error){
        console.log(error);
        alert(error.message);

      },function(){
    
        storage.ref("images").child(file.name).getDownloadURL().then(function(url){
          db.collection("posts").add({
            titulo: tituloPost,
            image: url,
            userName: props.user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });

          setProgress(0);
          setfile(null);

          
          document.getElementById("form-upload").reset();
          FecharModalUpload(e);
          
      })
      })
      
      
    }




    return(
        <div className="header">

          <div id='modalcriarconta' className='modalcriarconta'>
              <div className='formcriarconta'>
                    <h2>Criar Conta</h2>
                    <div className='close-modal' onClick={(e)=>FecharModalCriarConta(e)}><p >X</p></div>
                  <form>
                      
                      <input id='UsernameCriar' type='text' placeholder='Username...'></input>
                      <input id='EmailCriar' type='text' placeholder='Email...'></input>
                      <input id='SenhaCriar' type='password' placeholder='Senha...'></input>
                      <input type='submit' onClick={(e)=>CriarConta(e)} value="Criar conta!"></input>

                  </form>
              </div>
          </div>

          <div id='modalupload' className='modalupload'>
              <div className='formupload' >
                    <h2>Fazer Post</h2>
                    <div className='close-modal' onClick={(e)=>FecharModalUpload()}><p >X</p></div>
                  <form  id="form-upload" onSubmit={(e)=>UploadPost(e)} >
                      <progress id='progress-upload' value={progress}></progress>
                      <input onChange={(e)=>setfile(e.target.files[0])} id='upload-image' type='file' name='file' ></input>
                      <input id= 'titulo-upload' type='text' placeholder='Titulo do Post...'></input>
                      
                      <input type='submit' value="Postar no Feed!"></input>

                  </form>
              </div>
          </div>


          

          <div className='center'>
            <div className="header_logo">
                <a href=""><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" /></a>
            </div>

            {
              (props.user)?
                <div className='header_post'>
                  <span>ola, <b>{props.user}</b></span>
                  <a onClick={(e)=>AbrirModalUpload()}>Post</a>  
                  <span className='logout' onClick={(e)=>Logout(e)}>Logout</span>
                </div>

              :
              <div className='header_loginForm'>
              <form>

                <input id='EmailLogin' type='text' placeholder='Email...'/>
                <input id='SenhaLogin' type='password' placeholder='Senha...'/>
                <input onClick={(e)=>LoginConta(e)} type='submit' name='acao' value='Login'/>
                <a onClick={(e)=>AbrirModalCriarConta(e)}>criar conta</a>
              </form>
              
            </div>    

            }

            
          </div>
        </div>
    )

    
}

export default Header;