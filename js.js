document.getElementById('submit').addEventListener('click',()=>{

    //Defaults :
    document.getElementById('validation-response').innerText=''; // remove The Validation Text 
    let table = document.getElementById('table-manager');
    let row = document.createElement('tr'); // create a new Tr each time Clicked 
    let nameAuth = document.getElementById('auth-name');
    let title = document.getElementById('title');
    let type = document.getElementById('bookTypes');
    let price = document.getElementById('money');
    let date = document.getElementById('date');
    let radio = document.querySelector('input[name="r"]:checked');
    let err = []; 
    //End Defaults 
    
    function validate(elem,reg){
            let regEX= RegExp(reg,'g');
            if(!regEX.test(elem.value)){
                elem.style.border = '1px solid red';
                err.push('error');
            }
            if(elem.value==''){
                elem.style.border = '1px solid red';
                err.push('error');
            }
            else{
                elem.style.border = 'none';
            }
        }
    
    
    validate(title,'\\w');
    validate(nameAuth,'\\w')
    validate(price,'(^(\\d{1,5},\\d{1,2})$)|(^(\\d{1,5})$)');
    validate(date,'\\w');
    
    if(radio == null){
        alert('Select a type');
        err.push('error');
    }
    function createTd(elem){
        let td = document.createElement('td');
        let text = document.createTextNode(elem);
        td.appendChild(text);
        row.append(td);
        table.append(row);
    }
    
    function removeLength(elem) { // remove The unnecessary Charachters and replace with dotes "..."
            let l = [] ;
            if (elem.length > 26){
                l = elem.split("");
                for(let i = 0; 24 < l.length;i++){
                    l.splice(l.length-1);
                }
            return l.join('')+'.....';
            } else{return elem}
    }
    function createIcons(){
        let editIcon = document.createElement('i');
        let deleteIcon = document.createElement('i');
        let td = document.createElement('td');
        editIcon.className += 'fa fa-edit';
        editIcon.setAttribute('onclick','edited(this);');
        deleteIcon.className +='fa fa-trash';
        deleteIcon.setAttribute('onclick','remove(this);')
        td.appendChild(editIcon);
        td.appendChild(deleteIcon);
        row.appendChild(td);
        table.append(row);    
    }
    
    if(err.length !=0){ 
        document.getElementById('validation-response').innerText='Please Enter a Valid input';
    }
    else {
        table.style.display='table';
        createTd(date.value);
        createTd('$ '+price.value);
        createTd(type.value);
        createTd(removeLength(nameAuth.value));
        createTd(removeLength(title.value));
        createTd(radio.value)
        createIcons();     
        }
    });
    
    function edited(elem){
        elem.className += ' fa-check';
        elem.classList.remove('fa-edit');
        elem.parentElement.parentElement.setAttribute('contenteditable','true');
        elem.removeAttribute('onclick');
        elem.setAttribute('onclick','checked(this)');
    }
    
    function checked(elem){
        elem.className += ' fa-edit';
        elem.classList.remove('fa-check');
        elem.parentElement.parentElement.setAttribute('contenteditable','false');
        elem.removeAttribute('onclick');
        elem.setAttribute('onclick','edited(this)');
    }
    function remove(elem){
        elem.parentElement.parentElement.remove();
    }