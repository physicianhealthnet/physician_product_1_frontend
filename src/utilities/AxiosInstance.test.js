import { describe, it, expect } from 'vitest';
import { AxiosInstance, AxiosInstanceSecondryServer, AxiosInstanceDependency } from './AxiosInstance.js';

describe('Axios Instances', () => {
  it('should export AxiosInstance with correct baseURL', () => {
    expect(AxiosInstance).toBeDefined();
    expect(AxiosInstance.defaults.baseURL).toMatch(/localhost:3026|physicianhealthnet/);
  });

  it('should export AxiosInstanceSecondryServer with correct baseURL', () => {
    expect(AxiosInstanceSecondryServer).toBeDefined();
    expect(AxiosInstanceSecondryServer.defaults.baseURL).toMatch(/localhost:3028|dependencyforphn/);
  });

  it('should export AxiosInstanceDependency pointing to SecondryServer', () => {
    expect(AxiosInstanceDependency).toBeDefined();
    expect(AxiosInstanceDependency).toBe(AxiosInstanceSecondryServer);
  });
});
