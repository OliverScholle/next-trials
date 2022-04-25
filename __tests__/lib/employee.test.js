import { render } from '@testing-library/react';
import { MockContext, Context, createMockContext } from '__tests__/context';

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})
