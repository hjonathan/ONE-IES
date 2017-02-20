var Data = function() {
	this.data = {
      "id" : "record-id-02892",
      "created_by" : "user-reference-01",
      "creation_date" : "912378912739",
      "modified_by" : "user-reference-02",
      "modification_by" : "912378278131",
      "files" : [],
      "data" : {
        "first_name" : "alex",
        "last_name" : "angles",
        "phone" : "2344433"
      },
      "structure" : [
        {
          "field" : "first_name",
          "type" : "string"
        },
        {
          "field" : "last_name",
          "type" : "string"
        },
        {
          "field" : "phone",
          "type" : "string"
        }
      ]
    };
};

Data.prototype.connect = function(done) {    
    done(null, {});
};

Data.prototype.sendMessage = function(done) {
	done(null, {});	
};

module.exports = Data;
