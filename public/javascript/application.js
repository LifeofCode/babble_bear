var ShowView = function(view){
  document.body.empty;
  React.render(
    view, document.body
  );
}

var Nav = React.createClass({
  render: function(){
    return(
      <header>
        <nav className="nav">
          <div id="title-babble-bear">
            <img src="/Babble1.png"/> 
            <div id="bear-div">
              <img src="https://s-media-cache-ak0.pinimg.com/236x/63/c8/58/63c858955ea82aa8b1fa7d3382af4b49.jpg" id="bear"/>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});

var TopicList = React.createClass({
  render: function(){
    return (
      <div> Topics are here </div> 
    );
  }
});

var Category = React.createClass({
  handleClick: function(event){
    var category;
    category = this.props.data;

    ShowView(<TopicList data={category}/>);
    return; 
  },
  render: function(){
    var self = this;
    var category = this.props.data;
    
    return(
      <div id={"cat" + category.id} className="category" onClick={self.handleClick}>
        <div className="content"> 
          <h5 className="category-name"> {category.name} </h5>
        </div> 
      </div>
    );
  }
});
 
var CategoryList = React.createClass({
  render: function(){
    var categoryNodes = this.props.data.map(function (category){
      return (
        <Category data={category} /> 
      );
    });

    return (
      <div > 
        {categoryNodes};
      </div>
    );
  }
});

var Container = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url, 
      dataType: 'json'
    }).done(function(data){
      this.setState({data: data});
    }.bind(this));
  },
  render: function(){
    return (
      <div>
        <Nav />
        <div className="categories"> 
          <CategoryList data={this.state.data} /> 
        </div>
      </div>
    );
  }
});

ShowView(<Container url="/categories" />)
