import { Editor } from '@tinymce/tinymce-react';

type EditorProps = {
    content?: string;
    placeholder?: string;
    onBlur?: (content: string) => void;
    onChange?: (content: string) => void;
};
function TextEditor({ onBlur, onChange, content, placeholder }: EditorProps) {
    const handleEditorChange = (content: any, editor: any) => {
        onChange && onChange(content as string);
    };
    return (
        <>
            <Editor
                onEditorChange={handleEditorChange}
                apiKey="q92bsnsqdkmwsm0nivhpqnyf7kng1rud67z99qxhb28o6c39"
                initialValue=""
                init={{
                    height: 500,
                    resize: false,
                    autosave_ask_before_unload: false,
                    powerpaste_allow_local_images: true,
                    plugins: [
                        'advcode',
                        'advlist',
                        'anchor',
                        'autolink',
                        'codesample',
                        'fullscreen',
                        'help',
                        'image',
                        'editimage',
                        'lists',
                        'link',
                        'media',
                        'powerpaste',
                        'preview',
                        'searchreplace',
                        'table',
                        'tinymcespellchecker',
                        'visualblocks',
                        'wordcount',
                    ],
                    toolbar:
                        'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    // tinydrive_demo_files_url: '../_images/tiny-drive-demo/demo_files.json',
                    // tinydrive_token_provider: (success: any, failure: any) => {
                    //     success({
                    //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo',
                    //     });
                    // },
                }}
            />
        </>
    );
}

export default TextEditor;
