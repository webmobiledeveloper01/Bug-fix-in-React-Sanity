import React from 'react';
import SelectAnalyzer from './selectAnalyzer';
import AnalyzersTable from './analyzersTable';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { notifyError, notifySuccess } from '../utils/notifications';
import { client } from '../client';

function StationInfo({ stationData, addAnalyzer, setAddAnalyzer, stationId,
    analyzers, isEdit, setStationAnalyzers, stationAnalyzers, editDescription, setEditDescriptions,
    editAddress, setEditAddress, editTitle, setEditTitle, user, setAnalyzers, setStationData, station, setStation, setIsEdit
}) {

    const updateStation = (e) => {
        e.preventDefault();
        if (stationId?.stationId) {
            try {
                client.patch(stationId?.stationId)
                    .set({
                        title: editTitle,
                        description: editDescription,
                        address: editAddress
                    })
                    .commit()
                    .then(() => {
                        setStationData({ ...stationData, address: editAddress, description: editDescription, title: editTitle })
                        setStation(station.map(item => {
                            if (item._id === stationId?.stationId) {
                                return { ...item, title: editTitle, description: editDescription, address: editAddress }
                            }
                            else {
                                return item;
                            }
                        }))
                        notifySuccess('Station info updated!');
                        setIsEdit(false)
                    })
            }
            catch {
                notifyError('Opps, something went wrong, try again or contact admin')
            }
        }
    }


    return (
        <div className={isEdit === false ? 'stationInfo' : 'stationInfo editing'}>
            <h1 hidden={isEdit === true}>Station Name: {stationData?.title}</h1>
            <ul>

                {
                    isEdit === true &&
                    <div>
                        <li className='updateTitel'>Update Info</li>
                        <li>
                            <input
                                placeholder={`Enter station's title`}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </li>
                    </div>

                }


                <li>
                    {isEdit === false ? (<div><span>Description: </span>{stationData?.description}</div>)
                        :
                        (
                            <textarea
                                placeholder='Enter Description'
                                value={editDescription}
                                onChange={(e) => setEditDescriptions(e.target.value)}
                            />
                        )}
                </li>
                <li>
                    {isEdit === false ? (<div><span>Address: </span> <a href={stationData?.address} target='blank' title={stationData?.address}> {stationData?.address.length > 40 ? stationData?.address.slice(0, 40) : stationData?.address}</a></div>)
                        :
                        (
                            <input
                                placeholder='Edit Address'
                                value={editAddress}
                                onChange={(e) => setEditAddress(e.target.value)}
                            />
                        )
                    }

                </li>
                <li>
                    {isEdit === false &&
                        <div>
                            <span>Network: {stationData?.networkType}</span>
                        </div>
                    }
                </li>
                <li>
                    {
                        isEdit === false && (<div><span>Posted By: </span>{stationData?.postedBy.userName}</div>)
                    }

                </li>
                <button
                    className={isEdit === false ? 'hide' : 'saveUpdates'}
                    onClick={updateStation}
                    title='Save' >
                    Save
                </button>
            </ul>
            <div hidden={isEdit === true}>
                {

                    addAnalyzer === true && (
                        <SelectAnalyzer
                            setStationAnalyzers={setStationAnalyzers}
                            stationAnalyzers={stationAnalyzers}
                            analyzers={analyzers}
                            setAnalyzers={setAnalyzers}
                            setAddAnalyzer={setAddAnalyzer}
                            stationId={stationId}
                            stationName={stationData?.title}
                            stationData={stationData}
                            station={station}
                            setStation={setStation}
                        />
                    )
                }
                {
                    addAnalyzer === false &&
                    <AnalyzersTable
                        analyzers={analyzers}
                        stationId={stationId}
                        stationAnalyzers={stationAnalyzers}
                        key={stationData?.analyzers.id}
                        setAddAnalyzer={setAddAnalyzer}
                        stationData={stationData}
                        user={user}
                        setStationAnalyzers={setStationAnalyzers}
                        setAnalyzers={setAnalyzers}
                        station={station}
                        setStation={setStation}
                    />
                }

            </div>
        </div>
    )
}

export default StationInfo