import * as React from 'react';
import { Responses } from '../../types/Graph';

type ResponseTableProps = {
  responses: Responses;
  title: string;
};

// The Envoy flags can be found here:
// https://github.com/envoyproxy/envoy/blob/master/source/common/stream_info/utility.cc
const FLAGS = Object.freeze({
  DC: { code: '500', help: 'Downstream Connection Termination' },
  DI: { help: 'Delayed via fault injection' },
  FI: { help: 'Aborted via fault injection' },
  LH: { code: '503', help: 'Local service failed health check request' },
  LR: { code: '503', help: 'Connection local reset' },
  NR: { code: '404', help: 'No route configured for a given request' },
  RL: { code: '429', help: 'Ratelimited locally by the HTTP rate limit filter' },
  RLSE: { help: 'Rate limited service error' },
  SI: { help: 'Stream idle timeout' },
  UAEX: { help: 'Unauthorized external service' },
  UC: { code: '503', help: 'Upstream connection termination' },
  UF: { code: '503', help: 'Upstream connection failure in addition' },
  UH: { code: '503', help: 'No healthy upstream hosts in upstream cluster' },
  UO: { code: '503', help: 'Upstream overflow (circuit breaker open)' },
  UR: { code: '503', help: 'Upstream remote reset' },
  URX: { code: '503', help: 'Upstream retry limit exceeded' },
  UT: { code: '504', help: 'Upstream request timeout' }
});

export class ResponseTable extends React.PureComponent<ResponseTableProps> {
  constructor(props: ResponseTableProps) {
    super(props);
  }

  render() {
    return (
      <>
        <strong>{this.props.title}</strong>
        <table className="table">
          <thead>
            <tr key="table-header">
              <th>Code</th>
              <th>Flags</th>
              <th>% of Requests</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows(this.props.responses).map(row => (
              <tr key={row['key']}>
                <td>{row['code']}</td>
                <td title={this.getTitle(row['flags'])}>{row['flags']}</td>
                <td>{row['val']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  private getRows = (responses: Responses): Object[] => {
    const rows: Object[] = [];
    Object.keys(responses).map(code => {
      Object.keys(responses[code]).map(f => {
        rows.push({ key: `${code} ${f}`, code: code, flags: f, val: responses[code][f] });
      });
    });
    return rows;
  };

  private getTitle = (flags: string): string => {
    return flags
      .split(',')
      .map(flagToken => {
        flagToken = flagToken.trim();
        const flag = FLAGS[flagToken];
        return flagToken === '-' ? '' : `[${flagToken}] ${flag ? flag.help : 'Unknown Flag'}`;
      })
      .join('\n');
  };
}
