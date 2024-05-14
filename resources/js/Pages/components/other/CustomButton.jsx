
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export default function CheckButton({ children, Icon = ManageSearchIcon, onClick = () => { }, className = "" }) {
    return (
        <div
            className={`${className ? "" : "hover:bg-yellow-200 bg-yellow-300"} font-medium rounded-md px-2 flex text-sm items-center shadow-md cursor-pointer w-fit ` + className}
            onClick={onClick}
        >
            <Icon />
            <div>{children}</div>
        </div>
    )
}
