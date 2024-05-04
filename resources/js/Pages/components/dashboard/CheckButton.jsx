
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export default function CheckButton(props) {
    return (
        <div
            className='bg-yellow-300 font-medium rounded-md px-2 flex text-sm items-center shadow-md cursor-pointer'
        >
            <ManageSearchIcon />
            <div>{props.children}</div>
        </div>
    )
}
