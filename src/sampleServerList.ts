import type { Server } from "@/types/Server";

const sampleServerList: Server[] = [
  {
    name: 'home-red',
    address: '192.168.1.100',

    lastPing: new Date('2024-01-15T10:30:00'),
    registered: new Date('2024-01-01T09:00:00'),

    storages: ["348d6108b327e571adf111c978288e36 ", "3cb0c54e47c2c4485e6ada999e6c6d6b ", "4743cd8300c5580248f471ff247bed7a", "ce1406bfbe9d69716ee206d7bda104b1"],
  },
  {
    name: 'alpha-web-01',
    address: '203.0.113.1',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2025-10-01T10:00:00.000Z'),

    storages: ['a3f2b4c1d6e5f8a7c1b2d3e4f5a6b7c8', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b'],
  },
  {
    name: 'beta-api-02',
    address: '10.0.1.2',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2025-09-15T15:30:00.000Z'),

    storages: ['b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'],
  },
  {
    name: 'gamma-db-03',
    address: '192.168.10.3',

    lastPing: new Date('2025-11-27T23:00:00.000Z'),
    registered: new Date('2025-08-20T08:45:00.000Z'),

    storages: ['c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'delta-cache-04',
    address: '172.16.5.4',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2025-07-01T12:15:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100'],
  },
  {
    name: 'epsilon-msg-05',
    address: '203.0.113.5',

    lastPing: new Date('2025-11-28T00:30:00.000Z'),
    registered: new Date('2025-06-10T11:00:00.000Z'),

    storages: [],
  },
  {
    name: 'zeta-auth-06',
    address: '10.0.1.6',

    lastPing: new Date('2025-11-26T14:20:00.000Z'),
    registered: new Date('2025-05-05T09:30:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'],
  },
  {
    name: 'eta-file-07',
    address: '192.168.10.7',

    lastPing: new Date('2025-11-28T01:00:00.000Z'),
    registered: new Date('2025-04-12T16:00:00.000Z'),

    storages: ['a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5'],
  },
  {
    name: 'theta-load-08',
    address: '172.16.5.8',

    lastPing: new Date('2025-11-28T01:15:00.000Z'),
    registered: new Date('2025-03-20T14:00:00.000Z'),

    storages: ['b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7', '00112233445566778899aabbccddeeff', 'ffeeddccbbaa99887766554433221100'],
  },
  {
    name: 'iota-monitor-09',
    address: 'monitor-uri.example.com',

    lastPing: new Date('2025-11-28T01:30:00.000Z'),
    registered: new Date('2025-02-01T10:30:00.000Z'),

    storages: ['d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9'],
  },
  {
    name: 'kappa-dev-10',
    address: '10.0.1.10',

    lastPing: new Date('2025-11-27T18:00:00.000Z'),
    registered: new Date('2025-01-05T09:00:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f'],
  },
  {
    name: 'lambda-test-11',
    address: 'test-env.internal',

    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2024-12-15T11:00:00.000Z'),

    storages: [],
  },
  {
    name: 'mu-prod-12',
    address: '192.168.10.12',

    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2024-11-20T13:00:00.000Z'),

    storages: ['e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b'],
  },
  {
    name: 'nu-reporting-13',
    address: '203.0.113.13',

    lastPing: new Date('2025-11-28T01:35:00.000Z'),
    registered: new Date('2024-10-01T09:00:00.000Z'),

    storages: ['a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'],
  },
  {
    name: 'xi-analysis-14',
    address: '10.0.1.14',

    lastPing: new Date('2025-11-27T12:00:00.000Z'),
    registered: new Date('2024-09-05T15:00:00.000Z'),

    storages: ['b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'omicron-tool-15',
    address: '172.16.5.15',

    lastPing: new Date('2025-11-28T01:05:00.000Z'),
    registered: new Date('2024-08-10T10:00:00.000Z'),

    storages: ['c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2', 'f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7', '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'],
  },
  {
    name: 'pi-front-16',
    address: 'frontend.example.com',

    lastPing: new Date('2025-11-28T01:58:00.000Z'),
    registered: new Date('2024-07-15T08:00:00.000Z'),

    storages: [],
  },
  {
    name: 'rho-backend-17',
    address: 'backend.internal',

    lastPing: new Date('2025-11-28T01:45:00.000Z'),
    registered: new Date('2024-06-20T14:30:00.000Z'),

    storages: ['d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5', '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e'],
  },
  {
    name: 'sigma-proc-18',
    address: '192.168.10.18',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2024-05-25T16:00:00.000Z'),

    storages: ['e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'tau-queue-19',
    address: '10.0.1.19',

    lastPing: new Date('2025-11-28T00:00:00.000Z'),
    registered: new Date('2024-04-30T10:00:00.000Z'),

    storages: ['f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'],
  },
  {
    name: 'upsilon-search-20',
    address: '203.0.113.20',

    lastPing: new Date('2025-11-27T10:30:00.000Z'),
    registered: new Date('2024-03-01T11:00:00.000Z'),

    storages: ['1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e', '7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c', '3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a', '9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e'],
  },
  // --- 80 More Entries Follow ---
  {
    name: 'phi-auth-21',
    address: '192.168.10.21',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2024-02-15T09:00:00.000Z'),

    storages: ['a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'],
  },
  {
    name: 'chi-data-22',
    address: 'data-lake.internal',

    lastPing: new Date('2025-11-26T05:00:00.000Z'),
    registered: new Date('2024-01-20T12:00:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00'],
  },
  {
    name: 'psi-stream-23',
    address: '10.0.1.23',

    lastPing: new Date('2025-11-28T01:30:00.000Z'),
    registered: new Date('2023-12-01T15:00:00.000Z'),

    storages: ['c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'omega-legacy-24',
    address: '172.16.5.24',

    lastPing: new Date('2025-11-28T01:10:00.000Z'),
    registered: new Date('2023-11-05T10:00:00.000Z'),

    storages: ['a3f2b4c1d6e5f8a7c1b2d3e4f5a6b7c8', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9'],
  },
  {
    name: 'svr-east-25',
    address: '203.0.113.25',

    lastPing: new Date('2025-11-28T01:45:00.000Z'),
    registered: new Date('2023-10-10T13:00:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', '112233445566778899aabbccddeeff00'],
  },
  {
    name: 'svr-west-26',
    address: 'west-cluster.internal',

    lastPing: new Date('2025-11-28T00:50:00.000Z'),
    registered: new Date('2023-09-01T11:00:00.000Z'),

    storages: [],
  },
  {
    name: 'rtr-core-27',
    address: '192.168.10.27',

    lastPing: new Date('2025-11-27T19:00:00.000Z'),
    registered: new Date('2023-08-15T09:30:00.000Z'),

    storages: ['b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7'],
  },
  {
    name: 'lb-primary-28',
    address: '10.0.1.28',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2023-07-20T14:00:00.000Z'),

    storages: ['e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d'],
  },
  {
    name: 'ns-main-29',
    address: 'dns-master.internal',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2023-06-01T10:00:00.000Z'),

    storages: ['c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2'],
  },
  {
    name: 'dc-backup-30',
    address: '172.16.5.30',

    lastPing: new Date('2025-11-28T01:00:00.000Z'),
    registered: new Date('2023-05-10T11:00:00.000Z'),

    storages: ['d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5', '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e', 'f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'],
  },
  {
    name: 'app-service-31',
    address: 'app.example.com',

    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2023-04-15T12:00:00.000Z'),

    storages: ['e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'log-collector-32',
    address: '10.0.1.32',

    lastPing: new Date('2025-11-28T00:30:00.000Z'),
    registered: new Date('2023-03-20T09:00:00.000Z'),

    storages: [],
  },
  {
    name: 'dev-vm-33',
    address: '192.168.10.33',

    lastPing: new Date('2025-11-27T15:00:00.000Z'),
    registered: new Date('2023-02-01T15:30:00.000Z'),

    storages: ['1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e'],
  },
  {
    name: 'test-host-34',
    address: 'test-host.internal',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2023-01-05T10:00:00.000Z'),

    storages: ['7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c', '3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a'],
  },
  {
    name: 'prod-web-35',
    address: '172.16.5.35',

    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2022-12-10T11:00:00.000Z'),

    storages: ['9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e', 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9', '112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100'],
  },
  {
    name: 'sql-main-36',
    address: 'sql-db.example.com',

    lastPing: new Date('2025-11-28T01:45:00.000Z'),
    registered: new Date('2022-11-15T14:00:00.000Z'),

    storages: ['0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'redis-cache-37',
    address: '10.0.1.37',

    lastPing: new Date('2025-11-28T01:58:00.000Z'),
    registered: new Date('2022-10-20T10:30:00.000Z'),

    storages: ['c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2'],
  },
  {
    name: 'mq-broker-38',
    address: '192.168.10.38',

    lastPing: new Date('2025-11-27T08:00:00.000Z'),
    registered: new Date('2022-09-01T08:00:00.000Z'),

    storages: ['b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'storage-node-39',
    address: 'storage.internal',

    lastPing: new Date('2025-11-28T01:20:00.000Z'),
    registered: new Date('2022-08-10T16:00:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100', '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'],
  },
  {
    name: 'fw-proxy-40',
    address: '203.0.113.40',

    lastPing: new Date('2025-11-28T01:57:00.000Z'),
    registered: new Date('2022-07-15T13:00:00.000Z'),

    storages: [],
  },
  {
    name: 'vm-host-41',
    address: '10.0.1.41',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2022-06-20T10:00:00.000Z'),

    storages: ['a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5'],
  },
  {
    name: 'container-r-42',
    address: '172.16.5.42',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2022-05-01T15:00:00.000Z'),

    storages: ['b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7', '00112233445566778899aabbccddeeff'],
  },
  {
    name: 'jenkins-ci-43',
    address: 'jenkins.internal',

    lastPing: new Date('2025-11-27T10:00:00.000Z'),
    registered: new Date('2022-04-05T09:00:00.000Z'),

    storages: ['d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9'],
  },
  {
    name: 'git-repo-44',
    address: '192.168.10.44',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2022-03-10T12:00:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f', 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b'],
  },
  {
    name: 'backup-server-45',
    address: '203.0.113.45',

    lastPing: new Date('2025-11-28T01:05:00.000Z'),
    registered: new Date('2022-02-15T13:30:00.000Z'),

    storages: ['e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', 'c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2'],
  },
  {
    name: 'test-api-46',
    address: 'test-api.example.com',

    lastPing: new Date('2025-11-28T01:58:00.000Z'),
    registered: new Date('2022-01-20T11:00:00.000Z'),

    storages: [],
  },
  {
    name: 'prod-api-47',
    address: '10.0.1.47',

    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2021-12-01T10:00:00.000Z'),

    storages: ['d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5', '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e'],
  },
  {
    name: 'data-proc-48',
    address: '172.16.5.48',

    lastPing: new Date('2025-11-27T23:00:00.000Z'),
    registered: new Date('2021-11-05T15:00:00.000Z'),

    storages: ['e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'reporting-etl-49',
    address: '192.168.10.49',

    lastPing: new Date('2025-11-28T01:30:00.000Z'),
    registered: new Date('2021-10-10T09:00:00.000Z'),

    storages: ['f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'],
  },
  {
    name: 'user-auth-50',
    address: 'auth-svr.internal',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2021-09-01T11:00:00.000Z'),

    storages: ['1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e', '7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c', '3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a', '9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e'],
  },
  {
    name: 'payment-gw-51',
    address: 'pay.example.com',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2021-08-15T14:30:00.000Z'),

    storages: ['a3f2b4c1d6e5f8a7c1b2d3e4f5a6b7c8'],
  },
  {
    name: 'search-index-52',
    address: '10.0.1.52',

    lastPing: new Date('2025-11-27T12:00:00.000Z'),
    registered: new Date('2021-07-20T10:00:00.000Z'),

    storages: ['b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2'],
  },
  {
    name: 'monitoring-ag-53',
    address: 'agent.internal',

    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2021-06-25T11:00:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100'],
  },
  {
    name: 'admin-portal-54',
    address: '192.168.10.54',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2021-05-30T13:00:00.000Z'),

    storages: ['a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'],
  },
  {
    name: 'gateway-core-55',
    address: '203.0.113.55',

    lastPing: new Date('2025-11-28T01:45:00.000Z'),
    registered: new Date('2021-04-01T09:00:00.000Z'),

    storages: [],
  },
  {
    name: 'cdn-edge-56',
    address: 'cdn-node-01.internal',

    lastPing: new Date('2025-11-28T01:35:00.000Z'),
    registered: new Date('2021-03-05T15:00:00.000Z'),

    storages: ['c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'reporting-db-57',
    address: '10.0.1.57',

    lastPing: new Date('2025-11-28T01:00:00.000Z'),
    registered: new Date('2021-02-10T10:00:00.000Z'),

    storages: ['b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'],
  },
  {
    name: 'etl-worker-58',
    address: '172.16.5.58',

    lastPing: new Date('2025-11-27T18:00:00.000Z'),
    registered: new Date('2021-01-15T11:00:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100', '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'],
  },
  {
    name: 'event-bus-59',
    address: 'event.internal',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2020-12-20T14:00:00.000Z'),

    storages: ['a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5', 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7'],
  },
  {
    name: 'security-log-60',
    address: '192.168.10.60',

    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2020-11-01T10:00:00.000Z'),

    storages: ['00112233445566778899aabbccddeeff'],
  },
  {
    name: 'cms-host-61',
    address: 'cms.example.com',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2020-10-05T08:30:00.000Z'),

    storages: ['d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9'],
  },
  {
    name: 'api-gateway-62',
    address: '10.0.1.62',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2020-09-10T11:00:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f'],
  },
  {
    name: 'data-warehouse-63',
    address: '172.16.5.63',

    lastPing: new Date('2025-11-27T10:30:00.000Z'),
    registered: new Date('2020-08-15T15:00:00.000Z'),

    storages: ['e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', 'c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2', 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5', '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e'],
  },
  {
    name: 'proxy-service-64',
    address: 'proxy.internal',

    lastPing: new Date('2025-11-28T01:58:00.000Z'),
    registered: new Date('2020-07-20T10:00:00.000Z'),

    storages: [],
  },
  {
    name: 'auth-ldap-65',
    address: '192.168.10.65',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2020-06-01T11:00:00.000Z'),

    storages: ['f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'],
  },
  {
    name: 'app-main-66',
    address: '203.0.113.66',

    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2020-05-05T13:00:00.000Z'),

    storages: ['e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'worker-node-67',
    address: 'worker-host.internal',

    lastPing: new Date('2025-11-27T15:00:00.000Z'),
    registered: new Date('2020-04-10T09:00:00.000Z'),

    storages: ['1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e'],
  },
  {
    name: 'metrics-coll-68',
    address: '10.0.1.68',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2020-03-15T10:00:00.000Z'),

    storages: ['7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c', '3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a', '9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e'],
  },
  {
    name: 'job-scheduler-69',
    address: '172.16.5.69',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2020-02-20T14:00:00.000Z'),

    storages: ['a3f2b4c1d6e5f8a7c1b2d3e4f5a6b7c8', '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9', '112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100'],
  },
  {
    name: 'nas-storage-70',
    address: 'nas.internal',

    lastPing: new Date('2025-11-28T01:00:00.000Z'),
    registered: new Date('2020-01-01T08:00:00.000Z'),

    storages: ['c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5'],
  },
  {
    name: 'dev-db-71',
    address: '192.168.10.71',

    lastPing: new Date('2025-11-28T01:58:00.000Z'),
    registered: new Date('2019-12-10T12:00:00.000Z'),

    storages: ['b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'],
  },
  {
    name: 'test-db-72',
    address: '10.0.1.72',

    lastPing: new Date('2025-11-28T01:45:00.000Z'),
    registered: new Date('2019-11-15T13:00:00.000Z'),

    storages: ['112233445566778899aabbccddeeff00', 'aaffbbeeccdd99887766554433221100', '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d'],
  },
  {
    name: 'prod-db-73',
    address: 'prod-sql.example.com',

    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2019-10-20T10:00:00.000Z'),

    storages: ['a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5', 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7', '00112233445566778899aabbccddeeff'],
  },
  {
    name: 'report-cache-74',
    address: '172.16.5.74',

    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2019-09-01T09:00:00.000Z'),

    storages: ['d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9'],
  },
  {
    name: 'msg-queue-75',
    address: '203.0.113.75',

    lastPing: new Date('2025-11-27T19:00:00.000Z'),
    registered: new Date('2019-08-05T14:00:00.000Z'),

    storages: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', '9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f'],
  },
  {
    name: 'firewall-main-76',
    address: 'firewall.internal',

    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2019-07-10T11:00:00.000Z'),

    storages: ['e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b'],
  },
  {
    name: 'jump-host-77',
    address: '10.0.1.77',

    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2019-06-15T10:00:00.000Z'),

    storages: ['c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2'],
  },
  {
    name: 'vpn-server-78',
    address: 'vpn.example.com',

    lastPing: new Date('2025-11-28T01:30:00.000Z'),
    registered: new Date('2019-05-20T14:00:00.000Z'),

    storages: ['d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5', '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e', 'f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3', 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9'],
  },
  {
    name: 'auth-proxy-79',
    address: '192.168.10.79',

    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2019-04-01T09:00:00.000Z'),

    storages: ['0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'],
  },
  {
    name: 'data-center-alpha',
    address: 'tcp://10.0.1.50:8080',

    lastPing: new Date('2024-01-20T14:22:15'),
    registered: new Date('2023-12-10T08:15:00'),

    storages: ["a1b2c3d4e5f678901234567890123456"],
  },
  {
    name: 'cloud-backup-01',
    address: 'https://storage.cloud.com/api',

    lastPing: new Date('2024-01-19T23:45:30'),
    registered: new Date('2024-01-05T11:20:00'),

    storages: ["fedcba9876543210fedcba9876543210", "1234567890abcdef1234567890abcdef"],
  },
  {
    name: 'server-blue',
    address: '192.168.2.200',

    lastPing: new Date('2024-01-18T09:15:45'),
    registered: new Date('2023-11-25T14:30:00'),

    storages: [],
  },
  {
    name: 'archive-node-5',
    address: 'tcp://172.16.32.101:9000',

    lastPing: new Date('2024-01-21T07:30:00'),
    registered: new Date('2023-10-15T16:45:00'),

    storages: ["5a4b3c2d1e0f9e8d7c6b5a4b3c2d1e0f", "9e8d7c6b5a4b3c2d1e0f9e8d7c6b5a4b", "2d1e0f9e8d7c6b5a4b3c2d1e0f9e8d7c"],
  },
  {
    name: 'web-storage-main',
    address: 'https://api.webserver.com/storage',

    lastPing: new Date('2024-01-20T18:20:10'),
    registered: new Date('2024-01-02T10:00:00'),

    storages: ["ffeeddccbbaa99887766554433221100"],
  },
  {
    name: 'backup-server-02',
    address: '192.168.3.55',

    lastPing: new Date('2024-01-17T22:10:30'),
    registered: new Date('2023-12-28T13:25:00'),

    storages: ["11223344556677889900aabbccddeeff", "aabbccddeeff00998877665544332211"],
  },
  {
    name: 'nas-home',
    address: '192.168.1.150',

    lastPing: new Date('2024-01-21T12:05:00'),
    registered: new Date('2023-09-20T08:00:00'),

    storages: ["6d5e4c3b2a1908f7e6d5c4b3a291807f", "f7e6d5c4b3a291807f6e5d4c3b2a1908", "3b2a1908f7e6d5c4b3a291807f6e5d4c", "908f7e6d5c4b3b2a1908f7e6d5c4b3a2"],
  },
  {
    name: 'cluster-node-1',
    address: 'tcp://10.1.1.101:8080',

    lastPing: new Date('2024-01-19T15:40:20'),
    registered: new Date('2023-11-10T09:15:00'),

    storages: ["445566778899aabbccddeeff00112233"],
  },
  {
    name: 'remote-storage',
    address: 'https://remote-storage.org/api/v1',

    lastPing: new Date('2024-01-16T11:25:35'),
    registered: new Date('2023-12-01T12:00:00'),

    storages: ["ddccbbaa99887766554433221100ffee", "66554433221100ffeeddccbbaa998877", "00ffeeddccbbaa998877665544332211"],
  },
  {
    name: 'server-gamma',
    address: '192.168.4.75',

    lastPing: new Date('2024-01-21T08:45:00'),
    registered: new Date('2024-01-10T14:20:00'),

    storages: ["1a2b3c4d5e6f7890abcd1234ef567890"],
  },
  {
    name: 'data-node-7',
    address: 'tcp://172.17.33.44:7000',

    lastPing: new Date('2024-01-18T16:55:40'),
    registered: new Date('2023-10-25T11:30:00'),

    storages: ["7890abcdef1234567890abcdef123456", "4567890abcdef1234567890abcdef12", "1234567890abcdef1234567890abcdef", "abcdef1234567890abcdef1234567890"],
  },
  {
    name: 'cdn-edge-03',
    address: 'https://cdn.example.com/storage',

    lastPing: new Date('2024-01-20T20:15:25'),
    registered: new Date('2023-12-15T16:45:00'),

    storages: ["33445566778899aabbccddeeff001122"],
  },
  {
    name: 'office-server',
    address: '192.168.10.25',

    lastPing: new Date('2024-01-19T13:20:15'),
    registered: new Date('2023-11-30T08:00:00'),

    storages: ["a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5", "b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2"],
  },
  {
    name: 'backup-archive',
    address: 'tcp://10.2.2.200:9090',

    lastPing: new Date('2024-01-17T19:30:50'),
    registered: new Date('2023-09-15T10:20:00'),

    storages: ["c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9", "d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6", "e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3"],
  },
  {
    name: 'cloud-node-beta',
    address: 'https://node-beta.cloudprovider.com',

    lastPing: new Date('2024-01-21T09:10:05'),
    registered: new Date('2024-01-08T15:30:00'),

    storages: ["f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0"],
  },
  {
    name: 'storage-server-12',
    address: '192.168.5.120',

    lastPing: new Date('2024-01-16T14:35:20'),
    registered: new Date('2023-12-20T09:45:00'),

    storages: ["2b3c4d5e6f7890a1b2c3d4e5f6a7b8c9", "90a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", "a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2"],
  },
  {
    name: 'db-replica-4',
    address: 'tcp://192.168.100.45:3306',

    lastPing: new Date('2024-01-20T11:50:30'),
    registered: new Date('2023-11-05T13:15:00'),

    storages: ["d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9"],
  },
  {
    name: 'file-server-main',
    address: 'https://files.company.com/api',

    lastPing: new Date('2024-01-19T17:25:45'),
    registered: new Date('2023-10-10T07:30:00'),

    storages: ["b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5", "c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9", "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6"],
  },
  {
    name: 'backup-node-8',
    address: '192.168.6.88',

    lastPing: new Date('2024-01-18T21:40:10'),
    registered: new Date('2023-12-05T11:00:00'),

    storages: ["f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3"],
  },
  // Continuing with more servers to reach 100...
  {
    name: 'server-delta',
    address: 'tcp://10.3.3.150:8080',

    lastPing: new Date('2024-01-21T06:15:00'),
    registered: new Date('2024-01-12T10:45:00'),

    storages: ["a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0", "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7"],
  },
  {
    name: 'web-cache-02',
    address: 'https://cache.webservice.com/storage',

    lastPing: new Date('2024-01-20T13:55:25'),
    registered: new Date('2023-11-20T15:30:00'),

    storages: ["c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4"],
  },
  {
    name: 'nas-office',
    address: '192.168.20.30',

    lastPing: new Date('2024-01-17T15:20:35'),
    registered: new Date('2023-10-05T08:45:00'),

    storages: ["d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1", "e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8", "f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5"],
  },
  {
    name: 'cluster-node-2',
    address: 'tcp://10.1.1.102:8080',

    lastPing: new Date('2024-01-19T10:30:40'),
    registered: new Date('2023-11-10T09:20:00'),

    storages: ["a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"],
  },
  {
    name: 'cloud-storage-05',
    address: 'https://storage05.cloud.net/api',

    lastPing: new Date('2024-01-21T11:05:15'),
    registered: new Date('2024-01-03T14:10:00'),

    storages: ["b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3", "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0"],
  },
];

export default sampleServerList;
