var RepoItem = require('./RepoItem.jsx')
var Top5 = require('./Top5.jsx')
var Actions = require('../actions.js')

var Dashboard = React.createClass({

  getInitialState: function() {
    return {
      sticky: false
    }
  },
  
  vote: function(id) {
    Actions.submitVote(this.props.dispatch, id)
  },
  
  componentDidMount: function() {
    document.onscroll = this.stickyRelocate;
  },
  
  componentWillUnmount: function() {
    document.onscroll = null;
  },
  
  stickyRelocate: function() {
    var divTop = this.refs.top5.getBoundingClientRect().top;
    var sticky = divTop <= 0;
    this.setState({sticky: sticky});
  },

  render: function() {
    var vote = this.vote;
    var user = this.props.state.user;
    var dispatch = this.props.dispatch;
    var repos;
    
    if(this.props.state.repos.length != 0) {
      repos = this.props.state.repos.map(function(repo){
        return <RepoItem key={repo.id} dispatch={dispatch} user={user} repo={repo} vote={function(){vote(repo.full_name)}} />
      })
      repos = (
        <ul id="submissions">
        {repos}
        </ul>
      )
    } else {
      repos = <div className="loading">
        <img src="build/images/puff.svg" />
      </div>
    }

    return (
      <div className="app">
        <div className="row">
          <div className="col-md-8">
            <img className="logo" src="build/images/fancy-gopher.jpg" width="100px" />
            <h1>Gopher Gala Votetastic</h1>
          </div>
          <div id="passport" className="col-md-4">
           {this.props.state.user.login} | 
             <span><a href="/logout">Logout</a></span>
            <img src={this.props.state.user.avatar_url} width="50px" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <h2>Submissions</h2>
            <p>Have a look at these wonderful projects and vote for your top five!</p>
            {repos}
          </div>
          <div className="col-md-4 col-md-offset-1" ref="top5">
            <div className={this.state.sticky ? "sticky" : ""}>
              <h2>My Top 5</h2>
              <p>You can drag to reorder your votes.</p>
              <Top5 state={this.props.state} dispatch={this.props.dispatch} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
