$("document").ready(function(){

$.ajax({
		method:"GET",
		url:"http://ec2-34-215-171-85.us-west-2.compute.amazonaws.com:5960/server/api/getAllBloodGroups",
		}).done(	function(result){ 


			var table_data="";
			if(result.statusCode=="200"){


			$.each(result.message,function(key,value){
				table_data+="<option value="+value.bloodGroupId+">"+value.bloodGroup+"</option>";
				});

			$('#blood').html(table_data);
		}
			

	});


$("button").click(function(){

	 $("#donorRegistration").validate({
    
        // Specify the validation rules
        rules: {
            name: "required",
            mail: "required",
            contact: "required",
            address:"required",
            weight: "required",
            dob:"required",
            issues:"required"
           
        },
        
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            mail: "Please enter valid email",
            contact:  "Please enter a valid contact number",             
            address:"Please enter your address",
            weight: "Please enter your weight",
           	dob: "Kindly select your date of birth",
           	issues:"Type 'Nill' if no issues"
            
        },
        
        submitHandler: function(form) {

          var name = document.getElementById("name").value;
          //alert(name)
	var mail = document.getElementById("mail").value;
	//alert(mail)
	var contact = document.getElementById("contact").value;
	//alert(contact)
	var weight = document.getElementById("weight").value;
	//alert(weight)
	var dob = document.getElementById("dob").value;
	var date = new Date(dob)
	var month = parseInt(date.getMonth())+1

	var actual_date="";
	 actual_date = date.getDate()+"\/"+month +"\/"+date.getFullYear()
    //alert(actual_date)    

	var address = document.getElementById("address").value;
	//alert(address)
	var gender = document.getElementsByName('gender');
	var gender_value;

    if(gender[0].checked)
        gender_value = gender[0].value;
    else
        gender_value = gender[1].value;

    //alert(gender_value)

    var issues = document.getElementById("issues").value;
//alert(issues)
    var blood = document.getElementById("blood").value;
  //  alert(blood);



    /*
        $.post("http://ec2-34-215-171-85.us-west-2.compute.amazonaws.com:5960/server/api/updateDonorInfo",
        {
        	
          "address":address,
			"bloodGroupId":blood,
			"dateOfBirth":actual_date,
			"donationComments":issues,
			"donorContactNumber":contact,
			"donorEmailId":mail,
			"donorName":name,
			"donorWeight":weight,
			"gender":gender_value,
			"userEmailId":"Web_Client" 
        },
        function(data,status){
        	alert(data)
        	alert(status)
            alert("message: " + data.message + "\nStatus: " + status);
        });*/




       						 $.ajax({
   							 method: "POST",
  						  	url: "http://ec2-34-215-171-85.us-west-2.compute.amazonaws.com:5960/server/api/updateDonorInfo",
    						data:JSON.stringify({
    							
  									address:address,
									bloodGroupId:blood,
									dateOfBirth:actual_date,
									donationComments:issues,
									donorContactNumber:contact,
									donorEmailId:mail,
									donorName:name,
									donorWeight:weight,
									gender:gender_value,
									userEmailId:"gokulkeshav7@gmail.com"

    								}),
    						contentType: "application/json; charset=utf-8",
   							 dataType: "json",
   							 success: function(data) {
      						  alert(data.message);
   								 },
   								 error: function(data){
     						   alert("Sorry! something went wrong!");
   								 }
								});
			


       							 }

   					 });

       		 

    });




});