App.module("Connection", function(Connection) {

Connection.Model = Backbone.Model.extend({
  
});

Connection.Collection = Backbone.Collection.extend({
    model: Connection.Model
  });
})
/*
      connections : [{
        onconnect : function(connection) {
        }
        ,options:{
            isSource : true,
            anchor : "BottomRight"
          }
       }, {
        onconnect : function(connection) {
        }
        ,options:{
            isTarget : true,
            anchor : "BottomLeft"
         } 
      }]*/          