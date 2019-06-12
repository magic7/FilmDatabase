// Called by films.html to populate table with all films and their category
function PopulateFilmsTable(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);

      //If a non-empty response comes back
      if (responseJson.length > 0) {
           var tableBodyHTML = "";
           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["film_id"] + "</td>" +
                                  "	<td>" + record["title"] + "</td>" +
                                  "	<td>" + record["description"] + "</td>" +
                                  "	<td>" + record["release_year"] + "</td>" +
                                  "	<td>" + record["length"] + "</td>" +
                                  "	<td>" + record["rating"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           document.getElementById("tableBody").innerHTML = tableBodyHTML;
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No film retrieved";
      }
		}
	};
  xhttp.open("GET", "api/films-categories", true);
  xhttp.send();
}

// Issue GET request for film with given ID
// Called by show-film.html and delete-film.html
function FindFilmByID() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);
      var tableBodyHTML = "";
      //If a non-empty response comes back
      if (responseJson.length > 0) {
          tableBodyHTML += "<thead><tr><th scope=\"col\">Film ID</th><th scope=\"col\">Title</th><th scope=\"col\">Description</th>" +
                           "<th scope=\"col\">Release Year</th><th scope=\"col\">Length</th><th scope=\"col\">Rating</th>" +
                           "<th scope=\"col\">Category ID</th><th scope=\"col\">Last Updated</th></tr></thead><tbody>";

           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["film_id"] + "</td>" +
                                  "	<td>" + record["title"] + "</td>" +
                                  "	<td>" + record["description"] + "</td>" +
                                  "	<td>" + record["release_year"] + "</td>" +
                                  "	<td>" + record["length"] + "</td>" +
                                  "	<td>" + record["rating"] + "</td>" +
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           tableBodyHTML += "</tbody>";
           document.getElementById("errorMessage").innerHTML = "";

					 var deleteButton = document.getElementById("deleteButton");
					 if(deleteButton){
							 deleteButton.style.display = 'block';
					 }
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No film with such ID";
      }
      document.getElementById("table").innerHTML = tableBodyHTML;
    }
  };
  xhttp.open("GET", "api/films/" + document.getElementById("filmIDInput").value, true);
  xhttp.send();
}

// Issue DELETE request for deleting a film with given ID
// Called by delete-film.html
function DeleteFilmByID() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    if (this.readyState == 4 && this.status == 200) {}
		else {}
  };
  xhttp.open("DELETE", "api/films/", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id="+ document.getElementById("filmIDInput").value);

  document.getElementById("table").innerHTML = "";
  document.getElementById("deleteButton").style.display = 'none';
}

// Populate a form filled with a film information
// Called by update-film.html
function PopulateFilmFormByID() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
			var responseJson = JSON.parse(this.responseText);
			//If a non-empty response comes back
			if (responseJson.length > 0) {

					 for (record of responseJson) {
					 		  var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
								document.getElementById("id").value = record["film_id"];
								document.getElementById("title").value = record["title"];
								document.getElementById("description").value = record["description"];
								document.getElementById("releaseYear").value = record["release_year"];
								document.getElementById("length").value = record["length"];

								for (const option of document.getElementById('rating')) {
      							if (option.value == record["rating"]) {
											option.setAttribute('selected', true);
											break;
										}
    						}

								for (const option of document.getElementById('catSelect')) {
										if (option.value == record["category_id"]) {
											option.setAttribute('selected', true);
											break;
										}
								}
					 }
					 document.getElementById("errorMessage").innerHTML = "";
			}
			// Else if nothing is retrieved
			else {
				// Display error message
				document.getElementById("errorMessage").innerHTML = "No film with such ID";
			}
		}
	};
	xhttp.open("GET", "api/films/" + document.getElementById("filmIDInput").value, true);
	xhttp.send();

	document.getElementById("updateFilmForm").style.display = 'block';
}

// Issue PUT request for updating a film with given ID
// Called by update-film.html
function UpdateFilmByID() {
	var xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function ReceivedCallback() {
			 if (xhttp.readyState = 4 && xhttp.status == 200) {
					 document.getElementById("errorMessage").innerHTML = this.responseText;
			 } else {
				 // Display error message
				 document.getElementById("errorMessage").innerHTML = "There was an error updating the film. Please retry.";
			 }
			 document.getElementById("updateFilmForm").style.display = 'none';
	 };

	 // Create request body based on the form info
	 var reqBody = "id=" + document.getElementById("id").value + "&";
	 reqBody += "title=" + document.getElementById("title").value + "&";
	 reqBody += "description=" + document.getElementById("description").value + "&";
	 reqBody += "releaseYear=" + document.getElementById("releaseYear").value + "&";
	 reqBody += "length=" + document.getElementById("length").value + "&";
	 reqBody += "rating=" + document.getElementById("rating").value + "&";
	 reqBody += "categoryID=" + document.getElementById("catSelect").value;

	 // Send PUT request
	 xhttp.open("PUT", "api/films/", true);
	 xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 xhttp.send(reqBody);
}


// Populate category combo box with values retrieved from the database on load
// Called by insert-film.html
function PopulateCatsComboBox(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("catSelect").innerHTML = CreateSelect(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", "api/categories", true);
	xhttp.send();
}

function CreateSelect(categories){
	var retVal = "";
	for (record of categories) {
    	retVal += "<option value=" + record["category_id"] + ">" + record["name"] + "</option>";
	}
	return retVal;
}

// Called by categories.html to populate table with all categories
function PopulateCatsTable(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);

      //If a non-empty response comes back
      if (responseJson.length > 0) {
           var tableBodyHTML = "";
           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           document.getElementById("tableBody").innerHTML = tableBodyHTML;
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No category retrieved";
      }
		}
	};
  xhttp.open("GET", "api/categories", true);
  xhttp.send();
}

function FindCatByID() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);
      var tableBodyHTML = "";
      //If a non-empty response comes back
      if (responseJson.length > 0) {
          tableBodyHTML += "<thead><tr><th scope=\"col\">Category ID</th><th scope=\"col\">Name</th><th scope=\"col\">Last Updated</th></tr></thead><tbody>";

           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           tableBodyHTML += "</tbody>";
           document.getElementById("errorMessage").innerHTML = "";
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No category with such ID";
      }
      document.getElementById("table").innerHTML = tableBodyHTML;
    }
  };
  xhttp.open("GET", "api/categories/" + document.getElementById("catIDInput").value, true);
  xhttp.send();
}
