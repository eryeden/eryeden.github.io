import BrowserOnly from '@docusaurus/BrowserOnly';

const MyComponent = () => {
    return (
        <BrowserOnly>
                    {() => <span>page url = {window.location.href}</span>}
        </BrowserOnly>
    );
};

export default MyComponent;