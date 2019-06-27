import React from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components/native';

@inject(stores => ({
    setNav:stores.nav.setNav,
    navTo:stores.nav.navTo
}))
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentDidMount() {
        const { navigation, setNav } = this.props;
        setNav(navigation);
    }

    navToRoomDetail = () => {
        const { navTo } = this.props;
        navTo('RoomDeatil');
    }

    render() {
        const { 
        } = this.state;

        return (
            <Container>
                <Button onPress={this.navToRoomDetail}>
                    <Text>
                        nav
                    </Text>
                </Button>
            </Container>
        );
    }
}

const Container = styled.ScrollView`
`;
const Text = styled.Text`
`;
const Button = styled.TouchableOpacity`
`;

export default Home;