# TODO

## Frontend/Backend pricing architecture restructure

- [x] Verify current frontend `Dashboard.tsx` collects only user-facing inputs.
- [x] Verify frontend sends minimal payload to `POST /predict_single`.
- [x] Verify backend `RideInput` accepts minimal payload.
- [x] Verify backend `predict_single` engineers non-user-facing features (past rides, loyalty, ratings, drivers) and builds ML feature vector.
- [ ] Run the project end-to-end (frontend + backend) and manually submit a prediction to verify response.
- [ ] If any runtime errors appear, patch code and re-run.
