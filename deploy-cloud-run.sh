GOOGLE_PROJECT_ID=data-lake-407218

gcloud builds submit \
    --tag gcr.io/$GOOGLE_PROJECT_ID/barkarkapi \
    --project=$GOOGLE_PROJECT_ID

gcloud run deploy barkarkapi \
    --image gcr.io/$GOOGLE_PROJECT_ID/barkarkapi \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --project=$GOOGLE_PROJECT_ID
