import { useEffect } from "react"



export default function GreenContainer({ children }) {
    return (
        <div className={`relative bg-emerald-50  rounded-md flex flex-col p-2 shadow-sm overflow-x-auto overflow-y-hidden shadow-emerald-600 mb-3`}>
            {children}
        </div>
    )
}
