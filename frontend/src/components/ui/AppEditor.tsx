import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IconButton, Paper, Container, Divider, Tooltip } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  Code,
  FormatListBulleted,
  FormatQuote,
} from "@mui/icons-material";
import "./editor.css";

const MenuButton = ({
  onClick,
  children,
  title,
  active,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  active: boolean;
}) => (
  <Tooltip title={title}>
    <IconButton
      onClick={onClick}
      color={active ? "primary" : "default"}
      size="small"
    >
      {children}
    </IconButton>
  </Tooltip>
);

const AppEditor = (initialValue?: JSONContent) => {
  const editor = useEditor({
    content: initialValue,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
  });

  if (!editor) return null;

  const MenuContent = ({ isBubble = false }) => (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        gap: 0.5,
        p: 0.5,
        backgroundColor: "background.paper",
      }}
    >
      {isBubble ? (
        <>
          <MenuButton
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <FormatBold fontSize="small" />
          </MenuButton>
          <MenuButton
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <FormatItalic fontSize="small" />
          </MenuButton>
          <MenuButton
            title="Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
          >
            <Code fontSize="small" />
          </MenuButton>
        </>
      ) : (
        <>
          <MenuButton
            active={editor.isActive("bold")}
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulleted fontSize="small" />
          </MenuButton>
          <MenuButton
            active={editor.isActive("blockquote")}
            title="Quote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FormatQuote fontSize="small" />
          </MenuButton>
        </>
      )}
    </Paper>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <EditorContent editor={editor} />
        <Divider sx={{ my: 2 }} />

        <FloatingMenu editor={editor}>
          <MenuContent />
        </FloatingMenu>

        <BubbleMenu editor={editor}>
          <MenuContent isBubble />
        </BubbleMenu>
      </Paper>
    </Container>
  );
};

export default AppEditor;
