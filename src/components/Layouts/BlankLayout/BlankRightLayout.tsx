type Props = {
    children?: JSX.Element;
};

const BlankRightLayout = ({ children }: Props) => {
    return (
        <>
            <div className="main flex justify-end">{children}</div>
        </>
    );
};

export default BlankRightLayout;
