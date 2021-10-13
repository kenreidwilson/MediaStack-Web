import { ListSubheader } from "@mui/material";

type Props = {
    header?: string,
    children?: JSX.Element
}

export default function SidebarItem({ header, children }: Props) {
    return (
        <>
            <ListSubheader sx={{ height: 35 }}>{header}</ListSubheader>
            {children}
        </>
    );
}
