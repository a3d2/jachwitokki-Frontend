import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types'
import styled from 'styled-components/native';
import RoomCard from '../../../../components/view/card/RoomCard';
import { Modal } from 'react-native'
import FilterView from '../../../../components/feedback/filter/FilterView';
import NormalButton from '../../../../components/feedback/button/NormalButton';
import RoomMapView from '../../../../components/view/map/MapView';
import assets from "@assets/general";
import SearchInput from '../../../../components/data/input/SearchInput';
import { StatusBarHeight } from '../../../../utils/utils';

@inject(stores => ({
    navTo:stores.nav.navTo,
}))
class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterVisible:false,
            mapVisible:false,
            region:{}
        }
    }
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
              latitude:       position.coords.latitude,
              longitude:      position.coords.longitude,
              latitudeDelta:  0.00922*1.5,
              longitudeDelta: 0.00421*1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        }, (error)=>console.log(error));
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    onRegionChange = (region, lastLat, lastLong) => {
        this.setState({
            region: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    
    onPressItem = (item) => {
        const { navTo } = this.props;
        navTo('RoomDetail', item);
    }

    openFilter = () => {
        this.setState({ filterVisible:true })
    }
    closeFilter = () => {
        this.setState({ filterVisible:false })
    }

    openMap = () => {
        this.setState({ mapVisible:true })
    }
    closeMap = () => {
        this.setState({ mapVisible:false })
    }
    onConfirmFilter = () => {

    }

    render() {
        const { rooms } = this.props;
        const { filterVisible, mapVisible, region } = this.state;

        if(!rooms) return;

        const roomsView = rooms.map((each) => {
            return (
                <RoomCard 
                    key={each.id}
                    data={each}
                    onPressItem={this.onPressItem.bind(this, each)}
                />
            )
        })

        return (
            <Container>
                <SearchContainer>
                    <SearchInput
                        placeholder={'학교나 장소를 입력해주세요'}
                        // onSearchInputChange={this.onSearchInputChange}
                        // onSearch={this.search}
                    />
                </SearchContainer>
                <HeaderContainer>
                    <CountContainer>
                        <CountText>
                            검샘ㅇㄴㄹㅁ ㄴㅇㄹ
                        </CountText>
                    </CountContainer>
                    <ButtonContainer>
                        <FilterButton
                            onPress={this.openFilter}
                        >
                            <FilterIcon source={assets.iconFilter}/>
                        </FilterButton>
                        <MapButton
                            onPress={this.openMap}
                        >
                            <MapIcon source={assets.iconMap}/>
                        </MapButton>
                    </ButtonContainer>
                </HeaderContainer>
                {roomsView}
                <Modal
                    animationType={'slide'}
                    visible={filterVisible}
                    onRequestClose={this.closeFilter}
                >
                    <FilterContainer>
                        <FilterView
                            title1={`거주 기간`}
                            title2={`가격 범위`}
                        />
                        <NormalButton
                            onPress={this.onConfirmFilter}
                            label={'적용하기'}
                        />
                    </FilterContainer>
                </Modal>
                <Modal
                    animationType={'slide'}
                    visible={mapVisible}
                    onRequestClose={this.closeMap}
                >
                    <MapContainer>
                        <RoomMapView
                            region={region}
                        />
                    </MapContainer>
                </Modal>
            </Container>
        );
    }
}
RoomList.propTypes = {
};

RoomList.defaultProps = {
}

const Container = styled.ScrollView`
    padding-top: ${StatusBarHeight()};
    flex:1;
`;

const SearchContainer = styled.View`
    padding-horizontal:20;
    padding-vertical:4;
`;

const HeaderContainer = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    height:40;
    padding-horizontal:10;
`;
const CountContainer = styled.View`
    padding-left:10;
`;
const CountText = styled.Text`
`;

const ButtonContainer = styled.View`
    flex-direction:row;
    align-items:center;
`;
const FilterButton = styled.TouchableOpacity`
`;
const FilterIcon = styled.Image`
    width:23;
    height:22;
    padding:10px;
`;

const MapButton = styled.TouchableOpacity`
`;
const MapIcon = styled.Image`
    width:22;
    height:22;
    margin-left:8;
    padding:10px;
`;

const FilterContainer = styled.View`
`;

const MapContainer = styled.View`
    flex:1;
`;

export default RoomList;