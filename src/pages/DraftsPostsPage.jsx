import './DraftsPostsPage.scss';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { DraftsPostsList, SearchDraftPost } from '../components/draftsPosts';

const DraftsPostsPage = () => {
  return (
    <Container fluid>
      <Container>
        <SearchDraftPost url="/admin/posts/draft" />
      </Container>
      <div className="wide-container m-auto">
        <DraftsPostsList />
      </div>
      <ToastContainer />
    </Container>
  );
};

export default DraftsPostsPage;
