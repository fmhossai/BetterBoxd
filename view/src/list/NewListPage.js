import './styles/newListPage.css';
import MovieSelection from './MovieSelection';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { baseURL } from '../consts/consts.js';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';

const NewListPage = ({ setNewListOpen, user }) => {
    const [listTitle, setListTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);

    const onListTitleChange = (event) => {
        setListTitle(event.target.value);
    };
    const onSummaryChange = (event) => {
        setSummary(event.target.value);
    };

    const closeNewList = () => {
        setNewListOpen(false);
    };

    const addMovieSelection = (searchResults, i) => {
        var movieSelection = {
            url: searchResults[i].url,
            movieID: searchResults[i].movieID,
        }
        for (var i = 0; i < selectedMovies.length; i++) {
            if (selectedMovies[i].movieID === movieSelection.movieID) {
                console.log("here");
                return;
            }
        }
        setSelectedMovies((oldState) => [...oldState,movieSelection])
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            makeSearch();
        }, 150);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const onSearchChange = (props) => {
        setAnchorEl(props.currentTarget);
        if (props.target.value === '') {
            setSearchResultsOpen(false);
            setSearch('');
            setSearchResults([]);
        } else {
            setSearchResultsOpen(true);
            setSearch(props.target.value);
        }
    };

    const openSearchResults = (props) => {
        if (search !== '') {
            setSearchResultsOpen(true);
        }
    };

    const makeSearch = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/movie-search?movieName=${search}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var results = [];    
                data.map((data) => {
                    results.push({
                        title: data.title,
                        year: data.year,
                        movieID: data.trakt_id,
                        url: data.poster,
                    });
                });
                setSearchResults(results);     
            })
            .catch((error) => {});
    };

    const createListItems = () => {
        let list = [];
        for (let i = 0; i < searchResults.length && i < 10; i++) {
            list.push(
                <div className="search-bar-search-result-item-container">
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={
                                (function(searchResults, i) {
                                    return function() {
                                      addMovieSelection(searchResults, i);
                                    }
                                  })(searchResults, i)
                            }
                        >
                            <div className="search-bar-search-result-title">
                                {searchResults[i].title}
                            </div>
                            <div className="search-bar-search-result-year">
                                ({searchResults[i].year})
                            </div>
                        </ListItemButton>
                    </ListItem>
                    {i === searchResults.length - 1 || i === 9 ? (
                        <></>
                    ) : (
                        <Divider className="search-results-divider" />
                    )}
                </div>
            );
        }
        return list;
    };

    // //call this function when the 'submit' button is clicked
    // //and some movies are selected and a summary and title is written
    // const postList = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             description: /*description here,*/ 'temp',
    //             user_id: user._id,
    //             title: /*title here*/ 'title',
    //             trakt_ids: /*ids here*/ []
    //         })
    //     };
    //     fetch(`${baseURL}/post-movie-list`, requestOptions)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             //close the tab here now
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    return (
        <div>
            <div className="icon-bar">
                <div className="back-arrow" onClick={closeNewList}>
                    <ArrowBackIcon />
                </div>
            </div>
            <div className="title">
                <b>Add a New List</b>
            </div>
            <div className="input-wrapper">
                <TextField
                    className="list-title-input"
                    id="standard-basic"
                    label="List Title"
                    variant="standard"
                    value={listTitle}
                    onChange={onListTitleChange}
                    sx={{ n: 1, width: 400 }}
                />
            </div>
            <div className="input-wrapper">
                <TextField
                    className="summary-input"
                    id="standard-multiline-flexible"
                    label="Summary"
                    multiline
                    minRows={6}
                    variant="standard"
                    value={summary}
                    onChange={onSummaryChange}
                    sx={{ n: 1, width: 400 }}
                />
            </div>
            <div className="movie-search-input" onClick={openSearchResults}>
                <TextField
                    className="search-input"
                    id="standard-basic"
                    label="Search a Movie to Add"
                    variant="standard"
                    value={search}
                    onChange={onSearchChange}
                    sx={{ n: 1, width: 400 }}
                />
            </div>
            <Popper
                className="search-bar-popper"
                open={searchResultsOpen}
                anchorEl={anchorEl}
            >
                <div className="search-bar-search-results">
                    {searchResults.length === 0 ? (
                        <div className="search-bar-no-results">
                            No matching results found. Please try a different
                            search input.
                        </div>
                    ) : (
                        <List>{createListItems()}</List>
                    )}
                </div>
            </Popper>
            <div>
                <MovieSelection {...{ selectedMovies, setSelectedMovies }}/>
            </div>
        </div>
    );
};

export default NewListPage;
