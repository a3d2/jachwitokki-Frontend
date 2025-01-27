import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types'
import styled from 'styled-components/native';
import RoomCard from '../../../../components/view/card/RoomCard';
import MessageListItem from './MessageListItem';

@inject(stores => ({
    navTo:stores.nav.navTo,
    messages:stores.message.messages,
}))
class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    
    onPressItem = (item) => {
        const { navTo } = this.props;
        navTo('MessageDetail', item);
    }

    render() {
        const { messages } = this.props;
        if(!messages) return;

        const messagesView = messages.map((each) => {
            return (
                <MessageListItem 
                    key={each.roomNo}
                    {...each}
                    onPressItem={this.onPressItem.bind(this, each)}
                />
            )
        })

        return (
            <Container>
                {messagesView}
            </Container>
        );
    }
}
MessageList.propTypes = {
};

MessageList.defaultProps = {
}

const Container = styled.ScrollView`
    flex:1;
    padding-horizontal:20;
`;

export default MessageList;