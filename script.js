let repoarea = document.getElementById('repoarea');
let repositorybody =document.getElementById('repositorybody')
let filebody = document.getElementById('filebody');


function repoclick(event) {
  event.preventDefault()
  filebody.innerHTML = '';
  async function getdata3() {
    try {
      let filesurl = await fetch(event.target.id);
      let filedata = await filesurl.json();
      filedata.forEach(v => {
        if( v.type == 'dir') {
          filebody.append(createfoldertr(v.name,v.html_url))
        } else {
          filebody.append(createfiletr(v.name,v.html_url))
        }
      })
       console.log(filedata)
      
    } catch(error) {
      console.log(error)
    }
  }
  getdata3();
    
    
}


function btnclick(event) {
  event.preventDefault();

  let heroarea = document.getElementById('heroarea');
  heroarea.style.display = 'none' ;
  repoarea.style.display = 'block';
  repositorybody.innerHTML = ''

  async function getdata2() {
    try {
      let repourl = await  fetch(event.target.id)  
      repodata = await repourl.json();
      // console.log(repodata)
      let state = {
        "queryset": repodata,
        "page": 1,
        "rows": 6,
        "window": 5
      }
    
      buildTable()
    
      function pagination(queryset, page, rows) {
        let trimStart = (page - 1) * rows;
        let trimEnd = trimStart + rows;
        let trimedData = queryset.slice(trimStart, trimEnd)
        let pages = Math.ceil(repodata.length / rows);
        return {
          "queryset": trimedData,
          "pages": pages
        }
      }
     
    
      function pageButtons(pages) {
        let wrapper = document.getElementById("pagination-wrapper2");
        wrapper.innerHTML = "";
        let maxLeft = (state.page - Math.floor(state.window / 2));
        let maxRight = (state.page + Math.floor(state.window / 2));
        if (maxLeft < 1) {
          maxLeft = 1
          maxRight = state.window
        }
        if (maxRight > pages) {
          maxLeft = pages - (state.window - 1)
          maxRight = pages
          if (maxLeft < 1) {
            maxLeft = 1;
    
          }
        }
        for (let page = maxLeft; page <= maxRight; page++) {
          wrapper.innerHTML = wrapper.innerHTML + `<button value="${page}" class="btn btn-outline-dark">${page}</button>`
    
        }
        if (state.page !== 1) {
          wrapper.innerHTML = `<button value=${1} class="btn btn-outline-dark ">&#171; First</button>` + wrapper.innerHTML
        }
     
        let dynamic = document.getElementById("pagination-wrapper2")
        dynamic.addEventListener("click", function(e) {
          repositorybody.innerHTML = ""
          state.page = Number(e.target.value)
          
          buildTable()
        })
    
      }
    
      function buildTable() {
        let data = pagination(state.queryset, state.page, state.rows)
        let print = data.queryset
        for (let i = 0; i < print.length; i++) {
          repositorybody.append(creatediv(print[i].name,print[i].description,print[i].language,print[i].contents_url.substring(0,print[i].contents_url.length-7)))
          
        }
        pageButtons(data.pages)
      }
      
    } catch(error) {
      console.log(error)
    }
  }

  getdata2();
  

}


document.getElementById('userbutton').addEventListener('click',function(e) {
  e.preventDefault();
  filebody.innerHTML = ''
  heroarea.style.display = 'block';
  repoarea.style.display = 'none';
  let table = document.getElementById('table')
  table.innerHTML = '';
  
  let user = document.getElementById('userinput').value;
  async function getdata() {
    try {
   
      let url = await fetch(`https://api.github.com/search/users?q=${user}+in:user`)
      let userdata = await url.json()
      let repourl = await fetch(userdata.items[0].repos_url);
      repodata = await repourl.json()
           
  
      let state = {
          "queryset": userdata.items,
          "page": 1,
          "rows": 10,
          "window": 3
        }
      
        buildTable()
      
        function pagination(queryset, page, rows) {
          let trimStart = (page - 1) * rows;
          let trimEnd = trimStart + rows;
          let trimedData = queryset.slice(trimStart, trimEnd)
          let pages = Math.ceil(userdata.length / rows);
          return {
            "queryset": trimedData,
            "pages": pages
          }
        }
           
      
        function pageButtons(pages) {
          let wrapper = document.getElementById("pagination-wrapper");
          wrapper.innerHTML = "";
          let maxLeft = (state.page - Math.floor(state.window / 2));
          let maxRight = (state.page + Math.floor(state.window / 2));
          if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
          }
          if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)
            maxRight = pages
            if (maxLeft < 1) {
              maxLeft = 1;
      
            }
          }
          for (let page = maxLeft; page <= maxRight; page++) {
            wrapper.innerHTML = wrapper.innerHTML + `<button value="${page}" class="btn btn-outline-dark">${page}</button>`
      
          }
          if (state.page !== 1) {
            wrapper.innerHTML = `<button value=${1} class="btn btn-outline-dark ">&#171; First</button>` + wrapper.innerHTML
          }
        
          let dynamic = document.getElementById("pagination-wrapper")
          dynamic.addEventListener("click", function(e) {
            document.getElementById("table").innerHTML = ""
            state.page = Number(e.target.value)
            
            buildTable()
          })
      
        }
      
        function buildTable() {
          let data = pagination(state.queryset, state.page, state.rows)
          let print = data.queryset
          for (let i = 0; i < print.length; i++) {
            table.append(createtr(print[i].avatar_url,print[i].login,print[i].html_url,print[i].repos_url))  
            
          }
          pageButtons(data.pages)
        }
  
     
  
      
    } catch(error) {
        console.log(error)
    }
      
  }
  
  getdata()
  
  
})

function formfunction() {
  return false;
}



function createtr(src,name,url,value) {
    let tr =  document.createElement('tr');
    let th = document.createElement('th');
    th.scope = 'row';
    let img = document.createElement('img');
    img.src = src
    th.appendChild(img);
    
    let td1 = document.createElement('td')
    td1.classList.add('pt-4');
    td1.innerHTML = name.bold();

    let td2 = document.createElement('td');
    td2.classList.add('pt-4');
    td2.innerText = 'Profile: '

    let a = document.createElement('a');
    a.href = url
    a.innerText = url;

    td2.appendChild(a)

    let td3 = document.createElement('td');
    td3.classList.add('pt-4');

    
    
    let a2 = document.createElement('a');
    a2.setAttribute('class','btn btn-primary');
    a2.innerText = 'Check Repository';
    a2.id = value;
    a2.setAttribute('onclick','btnclick(event)')
    
    
     
    

    td3.appendChild(a2);

    tr.append(th,td1,td2,td3)

    return tr;

}

function creatediv(name,des,lang,id) {
  let div = document.createElement('div');
  
  let h5 = document.createElement('h5');

  let a = document.createElement('a');
  a.href = "";
  a.innerText = name;
  a.id = id;
  a.setAttribute('onclick','repoclick(event)')

  h5.appendChild(a);

  let p = document.createElement('p');
  p.innerText = des;

  let h55 = document.createElement('h5');
  let span = document.createElement('span');
  span.setAttribute('class','badge badge-secondary');
  span.innerText = lang;
  h55.appendChild(span);

  let hr = document.createElement('hr');
  hr.classList.add('sep-line');

  div.append(h5,p,h55,hr);

  return div;

}

function createfiletr(filename,href) {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.classList.add('pl-3');
  td.colSpan = '4';
  
  let a = document.createElement('a');
  a.href = href;
  a.innerText = filename;
  a.classList.add('file-a')


  let i = document.createElement('i');
  i.setAttribute('class','far fa-file-alt');

  td.append(i,a);

  tr.appendChild(td);

  return tr;
}

function createfoldertr(filename,href) {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.classList.add('pl-3');
  td.colSpan = '4';

  let a = document.createElement('a');
  a.href = href;
  a.innerText = filename 
  a.classList.add('file-a')
   
  let i = document.createElement('i');
  i.setAttribute('class','far fa-folder-open');

  td.append(i,a);

  tr.appendChild(td);

  return tr;
}