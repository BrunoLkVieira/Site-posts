import {db} from './firebase.js';
import {useEffect, useState} from 'react';




function Post(props){

    const [comentarios, setComentarios] = useState([]);

    useEffect(()=>{
        db.collection("posts").doc(props.id).collection("comentarios").onSnapshot(function(snapshot){
            setComentarios(snapshot.docs.map(function(document){
                return{id: document.id, info:document.data()}
            }))
        })
    },[])

   
    function Comentar(id, e){
        e.preventDefault();

        let comentarioAtual = document.getElementById("comentario-"+id).value;
       
        db.collection("posts").doc(id).collection("comentarios").add({
            nome: props.user,
            comentario: comentarioAtual
        })
        
        alert("comentario Feito com Sucesso!!!")
        document.getElementById("comentario-"+id).value = "";
        
    }


    return(  
        <div className='postsingle'>
           
          
          
            <img src={props.info.image}/>
            <p><b>{props.info.userName}:</b> {props.info.titulo}</p>
            
            {
                (props.user)?
                    <form onSubmit={(e)=>Comentar(props.id, e)}>
                        <textarea id={"comentario-"+props.id}></textarea>
                        <input type='submit'  value="Comentar!"></input>
                    </form>
                :
                    <div></div>    
            }
            <div className='coments'>
                
                    {
                    
                        comentarios.map(function(val){ 
                            return(
                                <div className='coments'>
                                
                                    <p><b>{val.info.nome}</b>: {val.info.comentario}</p>
                                
                                </div>
                            )      
                            

                        })
                    }
            </div>

        </div>
    )
    
}


export default Post;
