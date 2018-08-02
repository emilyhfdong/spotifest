import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserTopGenres } from "../../actions/fetchActions";

class TopGenres extends Component {
    componentDidMount() {
        // fetch top spotify artists for user.
        this.props.fetchUserTopGenres(this.props.userId);
    }
    mapTopGenresToList = listOfGenres => {
        const genres = listOfGenres.map((genre, index) => {
            return <li key={index}>{genre}</li>;
        });
        return genres;
    };
    render() {
        return (
            <div>
                <p>These are your top genres</p>
                <ul>{this.mapTopGenresToList(this.props.topGenres)}</ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    topGenres: state.fetch.userTopGenres
});

export default connect(
    mapStateToProps,
    { fetchUserTopGenres }
)(TopGenres);