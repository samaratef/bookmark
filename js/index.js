var siteNameInput=document.getElementById('siteName')
var siteUrlInput=document.getElementById('siteUrl')
var siteList=[]


if(localStorage!=null){
    siteList=JSON.parse(localStorage.getItem('site'))
    displayList()
}

function addUrlList(){
    if(siteList.length==0&&validateSiteName()&&validateUrl()){
        site={
            name:siteNameInput.value,
            url:siteUrlInput.value
        }
        siteList.push(site)
        localStorage.setItem("site",JSON.stringify(siteList))
        displayList()
        clear()
    }
    else if(validateSiteName()&&validateUrl()&&donotRepeatName()==false){
        site={
            name:siteNameInput.value,
            url:siteUrlInput.value
        }
        siteList.push(site)
        localStorage.setItem("site",JSON.stringify(siteList))
        displayList()
        clear()
}
else{
    swal("STOP!", "**the Site Name must be start with Capital **Don't repeat the site name  **the Url should be like ''https://name.com''", {
        icon : "error",
        buttons: {
            confirm: {
                className : 'btn btn-warning'
            }
        },
    });
}

}
function displayList(){
    var cartona=``;
    for(var i=0;i<siteList.length;i++){
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${siteList[i].name}</td>
        <td><a href="${siteList[i].url}"><button class="btn btn-warning text-white"><i class="fa-solid fa-eye p-1"></i>Visit</button></a></td>
        <td><button class="btn btn-danger" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash-can p-1"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById('savedList').innerHTML=cartona;
}
function deleteUrl(i){
    siteList.splice(i,1)
    localStorage.setItem('site',JSON.stringify(siteList))
    displayList()
}
function clear(){
    siteNameInput.value="";
    siteUrlInput.value="";
    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

function validateSiteName(){
    var regex=/^[A-Z][a-z]{2,10}$/
    if(regex.test(siteNameInput.value)==true){
        siteName.classList.replace('is-invalid','is-valid')
        return true;
        
    }
    else{
        siteName.classList.add('is-invalid')
        return false;

    }
}
function validateUrl(){
    var regexU=/^https:\/\/[a-z]{1,}[.][a-z]{3,}$/
    if(regexU.test(siteUrlInput.value)==true){
        siteUrl.classList.replace('is-invalid','is-valid')
        return true;
        
    }
    else{
        siteUrl.classList.add('is-invalid')
        return false;

    }
}
function donotRepeatName(){
    for(var j=0;j<siteList.length;j++){
        if(siteNameInput.value==siteList[j].name){
            siteName.classList.replace('is-valid','is-invalid')
            return true;
        } 
        else{
            return false;
            
        }  
        }
}