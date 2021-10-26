type Props = {
    children: JSX.Element,
    isCollasible?: boolean,
    width?: number | string
}

export default function Sidebar({ children, width }: Props) {

    return (
        <div style={{ width }}>
            {children}
        </div>
    );
}
