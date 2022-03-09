export default function Textarea(
    props: JSX.HTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <textarea {...props} cols={props.cols ?? 50} rows={props.rows ?? 10} />
    );
}
