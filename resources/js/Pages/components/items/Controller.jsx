

export default function Controller({
    style, className
}) {
    return (
        <div
            className={`bg-black ` + className}
            style={[
                {
                    fontWeight: 900
                }
                , style]}
        >
            Tes
        </div>
    )
}
