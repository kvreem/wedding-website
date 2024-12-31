import Avatar from '../Avatar';
import ActionButton from '../ActionButton';
import Divider from '../Divider';
import DropdownMenuTrigger from '../DropdownMenuTrigger';
import Indent from '../Indent';
import Input from '../Input';
import Message from '../Message';
import MessageViewer from '../MessageViewer';
import ModalError from '../modals/ModalError';
import Navigation from '../Navigation';
import RowEllipsis from '../RowEllipsis';
import SidebarLayout from '../SidebarLayout';

import * as React from 'react';

interface MessagesInterfaceProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ChatPreviewInline = (props) => {
  return <RowEllipsis style={{ opacity: 0.5, marginBottom: `10px` }}>{props.children}</RowEllipsis>;
};

const MessagesInterface: React.FC<MessagesInterfaceProps> = () => {
  return (
    <div style={{ minWidth: '28ch' }}>
      <Navigation
        logo="✶"
        left={
          <>
            <DropdownMenuTrigger
              items={[
                {
                  icon: '⊹',
                  children: 'Open',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
                {
                  icon: '⊹',
                  children: 'New Message',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
                {
                  icon: '⊹',
                  children: 'Quick Look',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
                {
                  icon: '⊹',
                  children: 'Close Messages',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
                {
                  icon: '⊹',
                  children: 'Open Conversation in New Window',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
                {
                  icon: '⊹',
                  children: 'Print...',
                  modal: ModalError,
                  modalProps: {
                    message: <>Non-fatal error detected: error FOOLISH (Please contact Sacred Computer support.)</>,
                    title: `MESSAGES`,
                  },
                },
              ]}
            >
              <ActionButton>FILE</ActionButton>
            </DropdownMenuTrigger>

            <ActionButton>EDIT</ActionButton>
            <ActionButton>VIEW</ActionButton>
          </>
        }
        right={
          <>
            <ActionButton>HELP</ActionButton>
          </>
        }
      ></Navigation>
      <Divider type="DOUBLE" />
      <SidebarLayout
        defaultSidebarWidth={12}
        sidebar={
          <>
            <Avatar>
              <Indent>
                Arthur
                <br />
                <ChatPreviewInline>No, it has to be more unique</ChatPreviewInline>
              </Indent>
            </Avatar>
            <Avatar>
              <Indent>
                Ariadne
                <br />
                <ChatPreviewInline>No. Just you.</ChatPreviewInline>
              </Indent>
            </Avatar>
            <Avatar>
              <Indent>
                Eames
                <br />
                <ChatPreviewInline>dream a little bigger</ChatPreviewInline>
              </Indent>
            </Avatar>
            <Avatar>
              <Indent>
                Yusef
                <br />
                <ChatPreviewInline>Depends on the dream.</ChatPreviewInline>
              </Indent>
            </Avatar>
            <Avatar>
              <Indent>
                Saito
                <br />
                <ChatPreviewInline>I bought the airline.</ChatPreviewInline>
              </Indent>
            </Avatar>
          </>
        }
      >
        <Message>Why are they all looking at me?</Message>
        <MessageViewer>Because my subconscious feels that someone else is creating this world. The more you change things, the quicker the projections start to converge on you.</MessageViewer>
        <Message>Converge?</Message>
        <MessageViewer>It's the foreign nature of the dreamer. They attack like white blood cells fighting an infection.</MessageViewer>
        <Message>They're going to attack us?</Message>
        <MessageViewer>No. Just you.</MessageViewer>
        <br />
        <br />
        <Input autoComplete="off" isBlink={true} label="Message" name="test_message_interface" />
      </SidebarLayout>
    </div>
  );
};

export default MessagesInterface;