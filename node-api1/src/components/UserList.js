// React
import React from 'react';
import { connect } from 'react-redux';
// Actions
import { getUsers } from '../actions';


const UserList = props => {
  console.log(props);
  return (
    <div>
      <h1>UserList Component</h1>
      <button onClick={props.getUsers}>GET users</button>
      {props.users && !props.isFetching && props.users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <h3>{user.bio}</h3>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.userReducer.users,
  error: state.userReducer.error,
  isFetching: state.userReducer.isFetching
});


export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);