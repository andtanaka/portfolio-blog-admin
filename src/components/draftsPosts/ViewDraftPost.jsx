import React from 'react';
import { marked } from 'marked'; //markdown to html
import parse from 'html-react-parser'; //html to jsx
import { Container } from 'react-bootstrap';

const ViewDraftPost = ({ post }) => {
  return <Container>{parse(marked.parse(post.body))}</Container>;
};

export default ViewDraftPost;
