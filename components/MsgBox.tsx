export interface MsgBoxProps {
    msg: string,
    isUser: boolean,
    index: number
}

export function MsgBox(props:MsgBoxProps) {
    return (
        <div key={"msg" +props.index} className={props.isUser ? 'bg-gray-200 rounded-md p-2 m-2' : 'bg-sky-200 rounded-md p-2 m-2'}>
            <p>{props.msg}</p>
        </div>
    )
}