import React from 'react';
import Card from "../UI/Card/Card";


const MovieCard = props => {
    const {movie, className} = props;

    const {summary, description, due_date, status, time_planned,id} = movie;

    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    return <Card header={summary}  link={link} className='h-100'/>;
};


export default MovieCard;
