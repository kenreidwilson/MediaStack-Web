import Sidebar from './Sidebar';

type Props = {
    children: JSX.Element,
    width?: number | string,
    isShown?: boolean,
    setIsShown?: (isShowed: boolean) => void
}

export default function ToggleableSidebar({ children, width = 'auto', isShown = true, setIsShown = () => {} }: Props) {

    return (
        <div>
            {isShown && <Sidebar width={width} >{children}</Sidebar>}
        </div>
    );
}
