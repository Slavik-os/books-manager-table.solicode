// create a new row Elements 
function addRow(content){
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(content));
            row.appendChild(td);
            table.appendChild(row);
        }

// add icons whenever row is made 
function addIcons(){
    let td = document.createElement('td');
    let edit = document.createElement('i');
    let trash = document.createElement('i');
    edit.className = 'fas';
    edit.className+=' fa-edit'
    edit.setAttribute('id','edite-icon');
    edit.setAttribute('onclick','setEdite()');
    edit.className+=' edite'

    td.appendChild(edit);

    trash.className = 'fas';
    trash.className+=' fa-trash-alt';
    trash.className+=' delete'
    
    td.appendChild(trash);
    row.append(td);
}



        // To not preduse a mess in global scooping .
        let row;
        let table;
        let pChilds;
        
        function check() {
            // get data from user
            let date = document.querySelectorAll('input[type="date"]');
            let  dateValue= date[0].value;
            let d = new Date(dateValue);
            let dateTr = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
            date[0].style.border='none';

            priceF = document.getElementById('money'); 
            priceF.style.border = 'none';
            
            price = priceF.value.trim();
            price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let nameV = document.getElementById('auth-name');
            nameV.style.border ='none';
            let name = nameV.value.trim();
            
            let selected = document.getElementById('bookTypes').value;
            let titleV = document.getElementById('title');
            titleV.style.border='none';
            title = titleV.value;

            let rdbs = document.querySelectorAll('input[name="radAnswer"]');
            let lang;
                for (let i=0;i < rdbs.length;i++) {
                    if (rdbs[i].checked) {
                        lang = rdbs[i].value;
                    }
                }
             
            let er = [];
            priceReg= '(^(\\d{1,4},\\d{1,5})$)|(^(\\d{1,5})$)';
            function setErr(namevalue,elemnt,reg,message){
                const validReg = RegExp(reg,'m');
                if(!validReg.test(namevalue)) {
                    
                    er.push(true);
                    console.log('not : '+namevalue);
                    elemnt.style.border = '3px solid #e30729' ;
                }
                
            }
            setErr(price,priceF,priceReg,'Enter a valid value');
            setErr(title,titleV,'\\w','Enter a valid value');
            if(date[0].value===''){
                date[0].style.border='3px solid #e30729';
                er.push('true'); 
            }else {date[0].style.border='none';}
            setErr(name,nameV,'\\w','Enter a valid value');
            
            if(lang === undefined){
                er.push('true');
                console.log('no langue selected ');
            }
            
            
            function addToTable() {
                // declare here to avoid local scooping only  
                table = document.querySelector('#table-manager');
                row = document.createElement('tr');
                row.className = 'row';
               
                // Display The table when executed

                document.getElementById('table-container').style.display='flex';
               
                // check for length and relpace 
                
                function removeLen(elm) {
                    let l = [] ;
                    if (elm.length > 26){
                        l = elm.split("");
                        for(let i = 0; 24 < l.length;i++){
                            l.splice(l.length-1);
                        }
                    return l.join('')+'...';
                    } else{return elm;}
                }

                removeLen(name);
                // Add Rows
                addRow(dateTr);
                addRow('$'+price);
                addRow(selected);
                addRow(removeLen(title));
                addRow(removeLen(name));
                addRow(lang);
                addIcons(); 
                
                
                // delete row 
                let remove = document.getElementsByClassName('delete');
                for (let i = 0; i < remove.length ;i ++){
                    remove[i].onclick =()=> {
                        remove[i].closest('.row').style.display ='none';
                    }
                }
                
                // edite row
    
            }
            // add row when err is false
            if (er.length !=0){
                document.getElementById('validation-response').innerText='Please Enter a valid Values';
            }else {
                addToTable();
            }
        }        
        

    // Toggle check to edite 
    function hello() {
        let e = document.getElementsByClassName('fa-check'); 
        for (let z=0;z < pChilds.length;z++){
            if(pChilds[z].innerHTML==''){
                alert('Please fill all the inputs !');
                break
            }
        }
        for (let z=0;z < pChilds.length;z++){
        pChilds[z].setAttribute('contenteditable','false');
        }
        let check = document.getElementById('check-icon');
            check.classList.remove('fa-check');
            check.className +=' fa-edit';
            check.removeAttribute('id');
            check.setAttribute('id','edite-icon');
            check.setAttribute('onclick','setEdite()');
        }
        
    // Toggle Edite to check 
    function setEdite(){
        
        let e = document.getElementsByClassName('fa-edit');
        for(i=0;i < e.length;i++){
            pChilds = e[i].closest('.row').children;
        }
        for(j=0;j < pChilds.length-1;j++){
            pChilds[j].setAttribute('contenteditable','true');
        }
            let edite = document.getElementById('edite-icon');
            edite.classList.remove('fa-edit');
            edite.classList.remove('edite');
            edite.className +=' fa-check';   
            edite.removeAttribute('id');
            edite.setAttribute('id','check-icon');
            edite.setAttribute('onclick','hello()');
    }