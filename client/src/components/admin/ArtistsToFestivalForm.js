import AutoComplete from "react-autocomplete";
import React, { Component } from "react";
import axios from "axios";

class ArtistsToFestivalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistsSelected: [],
            artist: "",
            festival: "",
            festivalSelected: ""
        };
    }

    handleArtistEnter = event => {
        if (event.keyCode === 13) {
            const artistsSelected = [
                ...this.state.artistsSelected,
                this.state.artist
            ];
            this.setState({ artistsSelected, artist: "" });
        }
    };

    handleFestivalEnter = event => {
        if (event.keyCode === 13) {
            this.setState({ festivalSelected: this.state.festival });
        }
    };

    handleClick = event => {
        axios
            .post("/api/v1/add_artists_to_festival", {
                festival: this.state.festivalSelected,
                artists: this.state.artistsSelected
            })
            .then(response => {
                console.log(response);
                this.setState({});
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const artistsSelected = this.state.artistsSelected.map(artist => {
            return <p key={artist}>{artist}</p>;
        });
        return (
            <div>
                <h1>Artists To Festival Form</h1>
                <p>Festivals</p>
                <div onKeyDown={this.handleFestivalEnter}>
                    <AutoComplete
                        items={this.props.festivalsForAutoComplete}
                        shouldItemRender={(item, value) =>
                            item.label
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                        }
                        getItemValue={item => `${item.label}, id:::${item.id}`}
                        renderItem={(item, highlighted) => (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: highlighted
                                        ? "#eee"
                                        : "transparent"
                                }}
                            >
                                {item.label}
                            </div>
                        )}
                        value={this.state.festival}
                        onChange={e =>
                            this.setState({ festival: e.target.value })
                        }
                        onSelect={value => this.setState({ festival: value })}
                    />
                </div>

                <p>Artists</p>
                <div onKeyDown={this.handleArtistEnter}>
                    <AutoComplete
                        items={this.props.artistsForAutoComplete}
                        shouldItemRender={(item, value) =>
                            item.label
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                        }
                        getItemValue={item => `${item.label}, id:::${item.id}`}
                        renderItem={(item, highlighted) => (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: highlighted
                                        ? "#eee"
                                        : "transparent"
                                }}
                            >
                                {item.label}
                            </div>
                        )}
                        value={this.state.artist}
                        onChange={e =>
                            this.setState({ artist: e.target.value })
                        }
                        onSelect={value => this.setState({ artist: value })}
                    />
                </div>
                <p>{this.state.festivalSelected}</p>
                {artistsSelected}
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}

export default ArtistsToFestivalForm;
