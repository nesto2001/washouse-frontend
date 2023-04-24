import BlogContainer from '../../containers/BlogContainer';

const HomePage = () => {
    return (
        <>
            <div className="homepage__section w-full container mx-auto pt-32" id="blogs">
                <BlogContainer />
            </div>
        </>
    );
};

export default HomePage;
