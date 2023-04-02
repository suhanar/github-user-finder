

$(document).ready(function(){
    $('#input').on('keyup',(e)=>{
        let username=e.target.value;

        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                
                client_id:config.CLIENT_ID,
                client_secret:config.SECRET_API_KEY
            }
        }).done(function(user){

            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                
                client_id:config.CLIENT_ID,
                client_secret:config.SECRET_API_KEY,
                    sort:'created:asc',
                    per_page:5
                }
            }).done(function(repos){

                $.each(repos,function(index,repo){
                    $('#repos').append(`
                      <div class='well container bg-light mt-5 p-3'>
                        <div class='row'>
                           <div class='col-md-6'>
                             <strong>${repo.name}</strong>:${repo.description}
                           </div>
                           <div class='col-md-4'>
                           <button type="button" class="btn btn-primary">Forks:${repo.forks_count}</button>
                           <button type="button" class="btn btn-warning">Watchers:${repo.watchers_count}</button>
                           <button type="button" class="btn btn-success">Stars : ${repo.stargazers_count}</button>
                           </div>
                           <div class='col-md-2'>
                             <a href='${repo.html_url}' target='_blank' class='btn btn-info'>Go To Repo Page</a>
                           
                           </div>
                        
                        </div>

                      </div>
                    
                    `)
                })

            })




            $('.profile').html(`

            <div class="card container mt-5">
  <div class="card-header">
     <h1>${user.name}</h1>
  
  </div>
  <div class="card-body">

  <div class="row">
    <div class="col-md-3 my-2">
       <img class='thumbnail' style="width:250px" src="${user.avatar_url}" class="card-img-top" alt="...">
       <a style="width:250px" href="${user.html_url}" class="btn btn-primary" target="_blank">View Profile</a>
    
    </div>
    <div class="col-md-9">

       <button type="button" class="btn btn-primary">Public repos:${user.public_repos}</button>
       <button type="button" class="btn btn-warning">Public Gists:${user.public_gists}</button>
       <button type="button" class="btn btn-success">Followers : ${user.followers}</button>

       <button type="button" class="btn btn-info">Following: ${user.following}</button>
       <br><br>


       <ul class="list-group bg-dark">
        <li class="list-group-item lead">Company: ${user.company}</li>
        <li class="list-group-item lead">Website/blog: ${user.blog}</li>
        <li class="list-group-item lead">Location: ${user.location}</li>
        <li class="list-group-item lead">Member Since: ${user.created_at}</li>
        
       </ul>
    
    </div>
  
  </div>
  
   
  </div>
 
  </div>
</div>

<div class="container mt-5">
<h3 class="header ">
Latest Repos
</h3>
<div id="repos">
</div>
</div>


           
             
             
           
            
            `)
        })
    })


});