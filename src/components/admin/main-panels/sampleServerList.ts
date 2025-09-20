import type { ServerDetails } from "@/types/user-data/ServerDetails";

const sampleServerList: ServerDetails[] = [
  {
    id: 9,

    name: 'home-red',
    ipAddress: '192.168.1.100',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T10:30:00'),
    registeredTimestamp: new Date('2024-01-01T09:00:00'),
    accountRequired: true,

    capacity: 1099511627776,
    freeSpace: 121162777612,
  },
  {
    id: 8,

    name: 'office-private',
    ipAddress: '192.168.1.101',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-14T15:20:00'),
    registeredTimestamp: new Date('2024-01-05T11:30:00'),
    accountRequired: false,

    capacity: 4327819519847,
    freeSpace: 3345789034251,
  },
  {
    id: 5,

    name: 'office-public',
    ipAddress: '192.168.1.101',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-14T15:20:00'),
    registeredTimestamp: new Date('2024-01-05T11:30:00'),
    accountRequired: false,

    capacity: 4327819519847,
    freeSpace: 434578903425,
  },
  {
    id: 4,

    name: 'Testing Server',
    ipAddress: '192.168.1.102',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T09:45:00'),
    registeredTimestamp: new Date('2024-01-10T14:15:00'),
    accountRequired: true,

    capacity: 248978905348923,
    freeSpace: 71318194327776,
  },
  {
    id: 0,

    name: 'home-blue',
    ipAddress: '192.168.1.100',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T10:30:00'),
    registeredTimestamp: new Date('2024-01-01T09:00:00'),
    accountRequired: true,

    capacity: 1099511627776,
    freeSpace: 1211627776,
  },

  {
    id: 10,
    name: 'media-server',
    ipAddress: '192.168.2.50',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:25:00'),
    registeredTimestamp: new Date('2024-01-08T13:20:00'),
    accountRequired: false,
    capacity: 8796093022208, // 8TB
    freeSpace: 1099511627776, // 1TB
  },
  {
    id: 11,
    name: 'cache-server-redis',
    ipAddress: '10.0.4.30',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:55:00'),
    registeredTimestamp: new Date('2024-01-12T10:15:00'),
    accountRequired: true,
    capacity: 549755813888, // 512GB
    freeSpace: 274877906944, // 256GB
  },
  {
    id: 12,
    name: 'ml-training-gpu-01',
    ipAddress: '10.0.5.40',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-14T08:30:00'),
    registeredTimestamp: new Date('2024-01-06T11:00:00'),
    accountRequired: true,
    capacity: 21990232555520, // 20TB
    freeSpace: 5497558138880, // 5TB
  },
  {
    id: 13,
    name: 'ml-training-gpu-02',
    ipAddress: '10.0.5.41',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:40:00'),
    registeredTimestamp: new Date('2024-01-06T11:05:00'),
    accountRequired: true,
    capacity: 21990232555520, // 20TB
    freeSpace: 8796093022208, // 8TB
  },
  {
    id: 14,
    name: 'file-share-nas',
    ipAddress: '192.168.3.100',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:20:00'),
    registeredTimestamp: new Date('2023-12-20T15:30:00'),
    accountRequired: false,
    capacity: 32985348833280, // 30TB
    freeSpace: 16492674416640, // 15TB
  },
  {
    id: 15,
    name: 'monitoring-prometheus',
    ipAddress: '10.0.6.50',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:58:00'),
    registeredTimestamp: new Date('2024-01-04T09:45:00'),
    accountRequired: true,
    capacity: 2199023255552, // 2TB
    freeSpace: 659607076666, // ~614GB
  },
  {
    id: 16,
    name: 'log-aggregator',
    ipAddress: '10.0.6.51',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:57:00'),
    registeredTimestamp: new Date('2024-01-04T09:50:00'),
    accountRequired: true,
    capacity: 4398046511104, // 4TB
    freeSpace: 879609302221, // ~819GB
  },
  {
    id: 17,
    name: 'api-gateway-01',
    ipAddress: '10.0.7.10',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:59:00'),
    registeredTimestamp: new Date('2024-01-11T14:25:00'),
    accountRequired: true,
    capacity: 1099511627776, // 1TB
    freeSpace: 549755813888, // 512GB
  },
  {
    id: 18,
    name: 'api-gateway-02',
    ipAddress: '10.0.7.11',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-15T03:45:00'),
    registeredTimestamp: new Date('2024-01-11T14:30:00'),
    accountRequired: true,
    capacity: 1099511627776, // 1TB
    freeSpace: 659607076666, // ~614GB
  },
  {
    id: 19,
    name: 'cdn-edge-01',
    ipAddress: '203.0.113.10',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:35:00'),
    registeredTimestamp: new Date('2024-01-07T16:15:00'),
    accountRequired: false,
    capacity: 6597069766656, // 6TB
    freeSpace: 2199023255552, // 2TB
  },
  {
    id: 20,
    name: 'cdn-edge-02',
    ipAddress: '203.0.113.11',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:36:00'),
    registeredTimestamp: new Date('2024-01-07T16:20:00'),
    accountRequired: false,
    capacity: 6597069766656, // 6TB
    freeSpace: 3298534883328, // 3TB
  },
  {
    id: 21,
    name: 'docker-registry',
    ipAddress: '10.0.8.20',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:42:00'),
    registeredTimestamp: new Date('2024-01-09T12:40:00'),
    accountRequired: true,
    capacity: 4398046511104, // 4TB
    freeSpace: 1319214153318, // ~1.2TB
  },
  {
    id: 22,
    name: 'k8s-master-01',
    ipAddress: '10.0.9.10',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:56:00'),
    registeredTimestamp: new Date('2024-01-13T08:20:00'),
    accountRequired: true,
    capacity: 1099511627776, // 1TB
    freeSpace: 329652131738, // ~307GB
  },
  {
    id: 23,
    name: 'k8s-worker-01',
    ipAddress: '10.0.9.20',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:54:00'),
    registeredTimestamp: new Date('2024-01-13T08:25:00'),
    accountRequired: true,
    capacity: 2199023255552, // 2TB
    freeSpace: 659607076666, // ~614GB
  },
  {
    id: 24,
    name: 'k8s-worker-02',
    ipAddress: '10.0.9.21',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-14T19:30:00'),
    registeredTimestamp: new Date('2024-01-13T08:30:00'),
    accountRequired: true,
    capacity: 2199023255552, // 2TB
    freeSpace: 879609302221, // ~819GB
  },
  {
    id: 25,
    name: 'development-sandbox',
    ipAddress: '192.168.4.200',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:15:00'),
    registeredTimestamp: new Date('2024-01-14T13:45:00'),
    accountRequired: false,
    capacity: 1099511627776, // 1TB
    freeSpace: 769804813107, // ~717GB
  },
  {
    id: 26,
    name: 'ci-cd-jenkins',
    ipAddress: '10.0.10.30',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:53:00'),
    registeredTimestamp: new Date('2024-01-05T15:20:00'),
    accountRequired: true,
    capacity: 2199023255552, // 2TB
    freeSpace: 1099511627776, // 1TB
  },
  {
    id: 27,
    name: 'game-server-minecraft',
    ipAddress: '192.168.5.100',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-13T20:45:00'),
    registeredTimestamp: new Date('2024-01-10T19:30:00'),
    accountRequired: false,
    capacity: 549755813888, // 512GB
    freeSpace: 107374182400, // 100GB
  },
  {
    id: 28,
    name: 'vpn-gateway',
    ipAddress: '203.0.113.50',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:48:00'),
    registeredTimestamp: new Date('2023-12-28T11:15:00'),
    accountRequired: true,
    capacity: 274877906944, // 256GB
    freeSpace: 107374182400, // 100GB
  },
  {
    id: 29,
    name: 'iot-data-collector',
    ipAddress: '10.0.11.40',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:52:00'),
    registeredTimestamp: new Date('2024-01-12T16:30:00'),
    accountRequired: true,
    capacity: 8796093022208, // 8TB
    freeSpace: 2638521139642, // ~2.4TB
  },
  {
    id: 30,
    name: 'email-server-postfix',
    ipAddress: '10.0.12.25',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:49:00'),
    registeredTimestamp: new Date('2023-12-22T10:45:00'),
    accountRequired: true,
    capacity: 1099511627776, // 1TB
    freeSpace: 219902325555, // ~205GB
  },

  {
    id: 101,
    name: 'web-server-01',
    ipAddress: '10.0.1.10',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:45:00'),
    registeredTimestamp: new Date('2024-01-03T14:20:00'),
    accountRequired: true,
    capacity: 2199023255552, // 2TB
    freeSpace: 879609302221, // ~819GB
  },
  {
    id: 102,
    name: 'database-primary',
    ipAddress: '10.0.2.15',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:50:00'),
    registeredTimestamp: new Date('2023-12-15T09:30:00'),
    accountRequired: true,
    capacity: 10995116277760, // 10TB
    freeSpace: 2199023255552, // 2TB
  },
  {
    id: 103,
    name: 'database-replica',
    ipAddress: '10.0.2.16',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:51:00'),
    registeredTimestamp: new Date('2023-12-15T09:35:00'),
    accountRequired: true,
    capacity: 10995116277760, // 10TB
    freeSpace: 3298534883328, // 3TB
  },
  {
    id: 106,
    name: 'backup-storage-01',
    ipAddress: '10.0.3.20',
    isOnline: true,
    lastPingTimestamp: new Date('2024-01-15T11:30:00'),
    registeredTimestamp: new Date('2024-01-02T16:45:00'),
    accountRequired: false,
    capacity: 54975581388800, // 50TB
    freeSpace: 10995116277760, // 10TB
  },
  {
    id: 107,
    name: 'backup-storage-02',
    ipAddress: '10.0.3.21',
    isOnline: false,
    lastPingTimestamp: new Date('2024-01-14T22:15:00'),
    registeredTimestamp: new Date('2024-01-02T16:50:00'),
    accountRequired: false,
    capacity: 54975581388800, // 50TB
    freeSpace: 43980465111040, // 40TB
  },


];

export default sampleServerList;
