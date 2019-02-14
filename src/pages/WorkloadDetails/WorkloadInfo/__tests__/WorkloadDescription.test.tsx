import * as React from 'react';
import { shallow } from 'enzyme';
import WorkloadDescription from '../WorkloadDescription';
import { Workload } from '../../../../types/Workload';

const workload: Workload = {
  name: 'myworkload',
  type: 'Deployment',
  createdAt: '42',
  resourceVersion: '42',
  istioSidecar: false,
  labels: {},
  appLabel: false,
  versionLabel: false,
  replicas: 1,
  availableReplicas: 1,
  pods: [],
  services: [],
  destinationServices: [],
  runtimes: [
    {
      name: 'Vert.x',
      dashboardRefs: []
    },
    {
      name: '42',
      dashboardRefs: []
    }
  ]
};

describe('WorkloadDescription', () => {
  it('should render with runtimes', () => {
    const wrapper = shallow(<WorkloadDescription workload={workload} istioEnabled={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
