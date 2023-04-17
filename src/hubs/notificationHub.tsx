import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BASE_URL } from '../common/Constant';

export let connection: HubConnection;

export const useSignalRConnection = (): boolean => {
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(BASE_URL + '/messageHub')
            .withAutomaticReconnect()
            .build();

        connection = newConnection;

        newConnection.start().then(() => {
            console.log('Kết nối SignalR');
            setConnected(true);
        });

        return () => {
            connection?.stop().then(() => {
                console.log('Ngắt kết nối SignalR');
            });
        };
    }, []);

    return connected;
};
